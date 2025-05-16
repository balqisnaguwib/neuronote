import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/server-service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SessionStorageService } from 'src/app/layout/session.storage.service';

interface Message {
  content: string;
  role: 'user' | 'system';
}

@Component({
  templateUrl: './chatpage.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./chatpage.component.css'],
})

export class ChatpageComponent implements OnInit {
  @ViewChild('notificationSound') notificationSound: ElementRef<HTMLAudioElement>;
  @ViewChild('messagesContainer') messagesContainer: ElementRef<HTMLDivElement>;

  chatbot: any;
  apikey: any;
  hideProgressBar: boolean = true;
  confirmButton: boolean = false;
  visible: boolean = false;

  messageHistory = [];
  messages: Message[] = [];
  audioMessages = [];
  playingIndex: number | null = null; // Index of the currently playing audio
  currentAudio: HTMLAudioElement | null = null; // Track currently playing audio
  newMessage: string = '';
  tempMessage: string = '';
  personalInfo: any;


  // audio recording
  isRecording = false;
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  audioUrl: string | null = null;



  constructor(
    private route: ActivatedRoute,
    private server: ServerService,
    private messageService: MessageService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.personalInfo = JSON.parse(window.sessionStorage.getItem(`personalInfo`)) ?? null
    console.log(this.personalInfo)
    this.clearMessage();
  }

  async doneDraft(){
    this.visible = false;
    this.router.navigate(['/dashboard']);
  }

  async checkConfirm() {
    this.visible = true;
  }

  async clearMessage(){
    try {
      this.messages = [];
      this.messageHistory = [];
      this.newMessage = '';
      this.hideProgressBar = false;
      this.confirmButton = false;
    } catch (error) {
        console.error(error);
    } finally {
        this.hideProgressBar = true;
    }
  }

  async sendMessage() {
      try {
          this.tempMessage = this.newMessage;
          if (this.newMessage.trim() !== '') {
            this.messages.push({ role: 'user', content: this.tempMessage });
          }
          this.newMessage = '';
          this.hideProgressBar = false;
          this.confirmButton = false;
          const response = await fetch('https://llm.nnoc.cloud:8842/neuranotelima/conversation/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'sdvW398493llweih4jnIsfNVEIOsdfdsN349058JLKNdewfdWsdBEFJKBSDDF'
            },
            body: JSON.stringify({messages: this.messages})
          })

          if (response.ok){
            let res = await response.json();
            let robotResponse = res['response'];
            if (typeof robotResponse === 'string'){
               this.messages.push({ content: robotResponse, role: 'system'});
               this.cdr.detectChanges();
               this.hideProgressBar = true;
            } else {
               const report = {...this.personalInfo, ...robotResponse};
               console.log(report)
               let draftReport = Object.entries(report).filter(([k, _]) => k !== 'status_keterangan' && k !== 'laporan_polis').map(([k, v]) => (`${k.toLocaleUpperCase()}: ${v}`)).join('\n')
               //report = Object.entries(report).map(([k, v]) => (`${k.toLocaleUpperCase()}: ${v}`)).join('\n')
               this.messages.push({ content: draftReport, role: 'system'});
               this.confirmButton = true;
               window.sessionStorage.setItem('draftReport', JSON.stringify(robotResponse));
               this.sessionStorageService.updateStatus();
               this.messageService.add({severity:'success', summary: 'Draf Laporan Disimpan!', detail: 'Sila semak dan sahkan butiran-butiran anda.'});
            }
            
            this.notificationSound.nativeElement.play();
            this.hideProgressBar = true;
            this.cdr.detectChanges();
          }
          else {
              throw new Error(response['message'] ?? response['detail'] ?? 'Failed to add data');
          }

      } catch (error) {
          console.error(error);
      } finally {
          this.hideProgressBar = true;
      }
  }

  async toggleRecording() {
    if (this.isRecording) {
      this.mediaRecorder.stop(); // Stop recording
    } else {
      await this.startRecording(); // Start recording
    }
    this.isRecording = !this.isRecording;
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = async () => {
        this.hideProgressBar = false;
        const formData = new FormData();
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        const audioFile = new File([audioBlob], 'recording.webm', {
          type: 'audio/webm',
        });
        formData.append('file', audioFile);
        const response = await fetch('https://llm.nnoc.cloud:8842/neuranotelima/transcribe/', {
          method: 'POST',
          headers: {
              'x-api-key': 'sdvW398493llweih4jnIsfNVEIOsdfdsN349058JLKNdewfdWsdBEFJKBSDDF',
              //'Content-Type': 'multipart/form-data',
          },
          body: formData
        })

        console.log(response);
        if (response.ok){
          let res = await response.json();
          let userScript = res['transcription'];
          this.messages.push({ content: userScript, role: 'user'});
          this.cdr.detectChanges();
          await this.sendMessage();
        } else {
          console.error("Error transcribing audio:", response.statusText);
          this.messageService.add({severity:'error', summary: 'Error transcribing audio', detail: response.statusText});
        }
      };

      this.mediaRecorder.start();
    } catch (err) {
      console.error('Failed to start recording:', err);
    } finally {
      this.hideProgressBar = true;
    }

  }



  async callTTSAPI(message: any) {
    try {
      console.log("text: ", message)
      const ttsResponse = await fetch('https://llm.nnoc.cloud:8842/neuranotelima/transcribe/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: message
        }),
        // credentials: 'include' // Add this line if the server requires credentials
      });

      if (ttsResponse.ok) {
        const blob = await ttsResponse.blob();
        // Ensure the blob is correctly converted to an object URL
        var audioUrl = URL.createObjectURL(blob);
        const audioElement = new Audio(audioUrl);
        this.audioMessages.push(audioElement);
        // audioElement.play();
      } else {
        this.audioMessages.push("Error");
        console.error("TTS API call failed:", ttsResponse.statusText);
        message.loading = false;
      }
      console.log(this.audioMessages);
      console.log(this.messages);
    } catch (error) {
      console.error("Error calling TTS API:", error);
      message.loading = false;
    }
  }

  // Function to play/stop TTS audio based on the message index
  playTTS(index: number) {
    if (index >= 0 && index < this.audioMessages.length) {
      const audioElement = this.audioMessages[index];

      if (this.currentAudio === audioElement) {
        // If the clicked audio is currently playing, stop it
        if (!audioElement.paused) {
          audioElement.pause();
          audioElement.currentTime = 0; // Reset playback position
          this.currentAudio = null;
          this.playingIndex = null;
        }
      } else {
        // Stop the currently playing audio, if any
        if (this.currentAudio && !this.currentAudio.paused) {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0; // Reset playback position
        }
        
        // Play the new audio
        if (audioElement) {
          audioElement.play();
          this.currentAudio = audioElement; // Update the reference to the currently playing audio
          this.playingIndex = (index*2)+1; // Update the index of the currently playing audio

          // Add event listener for when the audio ends
          audioElement.addEventListener('ended', () => {
            this.currentAudio = null;
            this.playingIndex = null;
          }, { once: true }); // Use { once: true } to remove the event listener after it triggers

        }
      }
    } else {
      console.warn('Index out of range.');
    }
  }
  

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error("Error scrolling to bottom:", err);
    }
  }

  formatRobotResponse(response: string): string {
    // Replace numbered list with bulleted list
    response = response.replace(/\d+\./g, '-');
    // Replace newlines with <br> tags
    response = response.replace(/\n/g, '<br>');
    return response;
  }
}

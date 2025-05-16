import { Component, Injectable, NgModule, SkipSelf } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastServiceModule } from './toast-service/toast-service.module';

@Injectable({
    providedIn: 'root',
})
@NgModule({
    providers: [ToastServiceModule]
})
export class ServerService {
    static clearSession() {
        throw new Error('Method not implemented.');
    }
    private credentials: string = null;
    private permissionLevel: string = '10';
    private appName: string = 'neuranotelima';
    private baseUri: string = 'https://llm.nnoc.cloud:8842/neuranotelima/'
    private enablePostRewrite: boolean = true;

    constructor(private toastService: ToastServiceModule) {
        this.credentials = null;
        this.permissionLevel = null;
        this.initSession();
    }
  
    isLoggedIn() {
        return Boolean(this.credentials)
    }
  
    setSession(data: Object) {
        this.credentials = data['token']
        //this.permissionLevel = String(data['user'][0]['role']['role_level'])
        window.sessionStorage.setItem(`hello_${this.appName}`, this.credentials)
        window.sessionStorage.setItem(`hellp_${this.appName}`, this.permissionLevel)
    }
  
    initSession() {
        if (this.credentials) return
        this.credentials = window.sessionStorage.getItem(`hello_${this.appName}`) ?? null
        this.permissionLevel = window.sessionStorage.getItem(`hellp_${this.appName}`) ?? null
    }
    
    clearSession() {
        this.credentials = null
        window.sessionStorage.removeItem(`hello_${this.appName}`)
    }
  
    sessionExpired() {
       this.clearSession()
       location.href = `${window.origin}`// commet dulu, nanti uncomment
    }
  
    getPermissionLevel() {
        return this.permissionLevel
    }

    showSuccess({ summary, detail }) {
        this.toastService.show({ severity: 'success', summary: summary, detail: detail });
    }
    
    showError({ summary, detail }) {
        this.toastService.show({ severity: 'error', summary: summary, detail: detail });
        console.log(summary, detail)
    }
    
    async fetchServer({
        uri,
        baseUri = `${this.baseUri}`,
        params = null, // URL params
        formData = null, // Form data
        jsonData = null, // JSON data
        successMsg = null,
        successDetail = null,
        errorMsg = null,
        method = 'GET',
        headers = {},
        options = {}, // Use to manually specify fetch options
        handleSessionExpired = true,
    }) 
    {
        let defaultHeaders = {
        }
        this.initSession()
        if (this.credentials) defaultHeaders['Authorization'] = `Bearer ${this.credentials}`

        method = method.toUpperCase();
        if (this.enablePostRewrite === true) {
            if (method == 'PUT') {
                method = 'POST';
                uri = uri.slice(-1) === '/' ? `${uri}put` : `${uri}/put`;
            }
            else if (method == 'DELETE') {
                method = 'POST';
                uri = uri.slice(-1) === '/' ? `${uri}delete` : `${uri}/delete`;
            }
        }
        
        let httpOptions: RequestInit = {
            method: method,
            headers: { 
            ...defaultHeaders,
            ...headers, 
            },
            redirect: 'follow',
            credentials: 'include',
        }
        if (params) {
            uri = uri.slice(-1) === '?' ? uri : `${uri}?`;
            uri = `${uri}${new URLSearchParams(params).toString()}`
        }
        if (formData) {
            httpOptions.body = formData
        }
        else if (jsonData) {
            httpOptions.body = JSON.stringify(jsonData)
            httpOptions.headers['Content-Type'] = 'application/json'
        }
        httpOptions = { ...httpOptions, ...options }
        
        return new Promise((resolve, reject) => {
            fetch(`${baseUri}${uri}`, httpOptions)
            .then(response => {
                if (handleSessionExpired === true && response.status == 401) {
                    this.sessionExpired();
                }
                return response.json()
            })
            .then(result => {
                let status = result.status ?? 500;
                let success = result.success ?? false;
            
                if (handleSessionExpired === true && status == 401) {
                    this.sessionExpired();
                }
                else if (status != 200 && success != true) {
                    throw new Error(result.error ?? result.message ?? result.detail ?? 'An error has occured');
                }
                else {
                    if (successMsg) this.showSuccess({ summary: successMsg, detail: successDetail ?? successMsg })
                    resolve(result)
                }
            })
            .catch(err => {
                if (errorMsg) this.showError({ summary: errorMsg, detail: err.message });
                reject(err);
            })
        })
    }
}
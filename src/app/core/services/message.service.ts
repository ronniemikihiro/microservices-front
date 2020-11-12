import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvalidEmailError } from '../errors/invalid-email-error';
import { RequiredPropertyError } from '../errors/required-property-error';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private snackBar: MatSnackBar) { }

    private open(message: string, background: string) {
        this.snackBar.open(message, '', {
            duration: 2000,
            horizontalPosition: 'end',
            panelClass: ['mat-toolbar', background]
        });
    }

    public success(message: string) {
        this.open(message, 'mat-primary');
    }

    public warn(message: string) {
        this.open(message, 'mat-accent');
    }

    public error(message: string) {
        this.open(message, 'mat-warn');
    }

    public notify(e : Error) {
        if(e instanceof RequiredPropertyError || 
           e instanceof InvalidEmailError) {
            this.warn(e.message);
        } else {
            this.error(e.message);
        }
    }
}

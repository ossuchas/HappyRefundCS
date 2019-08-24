import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    constructor(private http: HttpClient) {}

    // Base url
    readonly APIUrl = environment.apiUrl;

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data'
        })
    };

    public seqn_no = 1;

    helloWorld() {
        console.log('Hello World Upload service111');
    }

    public upload(files: Set<File>, _hyrf_id: string): { [key: string]: { progress: Observable<number> } } {
        // this will be the our resulting map
        const status: { [key: string]: { progress: Observable<number> } } = {};

        files.forEach(file => {
            // create a new multipart-form for every file
            const formData: FormData = new FormData();
            formData.append('image', file, file.name);
            formData.append('hyrf', _hyrf_id);
            formData.append('seqn_no', this.seqn_no.toString());

            // create a http-post request and pass the form
            // tell it to report the upload progress
            const req = new HttpRequest('POST', this.APIUrl + '/upload/image', formData, {
                reportProgress: true
            });

            // create a new progress-subject for every file
            const progress = new Subject<number>();
            this.seqn_no = this.seqn_no + 1;

            // send the http-request and subscribe for progress-updates
            const startTime = new Date().getTime();
            this.http.request(req).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // calculate the progress percentage

                    const percentDone = Math.round((100 * event.loaded) / event.total);
                    // pass the percentage into the progress-stream
                    progress.next(percentDone);
                } else if (event instanceof HttpResponse) {
                    // Close the progress-stream if we get an answer form the API
                    // The upload is complete
                    progress.complete();
                }
            });

            // Save every progress-observable in a map of all observables
            status[file.name] = {
                progress: progress.asObservable()
            };
        });

        this.seqn_no = 1;

        // return the map of progress.observables
        return status;
    }

    // Error handling
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
    // this will be the our resulting map
}

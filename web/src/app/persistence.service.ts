import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    private _collectedAssignments: Set<string>;
    constructor() {
        //get collectedAssignments from backend with GET call
        this._collectedAssignments = new Set<string>();
    }

    public hasCollectedAssignment(uuid: string): boolean {
        return this._collectedAssignments.has(uuid);
    }

    public updateCollectedAssignment(uuid: string): void {
        //update collectedAssignments from backend with PUT call
        this._collectedAssignments.add(uuid);
    }

    //this may not be necessary
    public deleteCollectedAssignment(uuid): void {
        //delete collectedAssignment from backend with DELETE call
        this._collectedAssignments.delete(uuid);
    }


}

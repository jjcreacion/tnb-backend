

export class actionsDto {
    canView : boolean;
    canUpdate : boolean;
    canDelete : boolean;

    constructor(canView, canUpdate, canDelete) {
        this.canView = canView;
        this.canUpdate = canUpdate;
        this.canDelete = canDelete;
    }

}

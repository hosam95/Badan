import config from '../config.json' assert{type:'json'}

const permissions: Array<string> = config.permissions.permissions

export type PermissionsMatrix={
    [p in typeof permissions[number]]:boolean;
}

export class Permitter{
    id?:string;
    project_id:string;
    user_id:string;
    isOwner?:boolean=false;
    permissionsMatrix:PermissionsMatrix;

    constructor(permitter:Permitter){
        this.project_id=permitter.project_id;
        this.user_id=permitter.user_id;
        this.permissionsMatrix=permitter.permissionsMatrix
        Object.assign(this, permitter);
    }

    public static createOwner(project_id:string,user_id:string){
        return new Permitter({
            project_id:project_id,
            user_id:user_id,
            isOwner:true,
            permissionsMatrix:{
                readLines:true,
                editLines:true,
                readVehicles:true,
                editVehicles:true,
                drive:true,
                accounting:true,
                readMembers:true,
                billing:true,
                editProject:true,
                manageDrivers:true,
                admin:true
            }
        })
    }

    public static createCustom(
        project_id:string,
        user_id:string,
        readLines:boolean,
        editLines:boolean,
        readVehicles:boolean,
        editVehicles:boolean,
        drive:boolean,
        accounting:boolean,
        readMembers:boolean,
        billing:boolean,
        editProject:boolean,
        manageDrivers:boolean,
        admin:boolean){
        return new Permitter({
            project_id:project_id,
            user_id:user_id,
            permissionsMatrix:{
                readLines:readLines,
                editLines:editLines,
                readVehicles:readVehicles,
                editVehicles:editVehicles,
                drive:drive,
                accounting:accounting,
                readMembers:readMembers,
                billing:billing,
                editProject:editProject,
                manageDrivers:manageDrivers,
                admin:admin
            }
        })
    }

}
export interface ProjectSettings{
    service_fee_rat:number,

    promote_drivers_applications:boolean,
    promote_vehicles_applications:boolean,

    project_type:'Rides'|'Transportation Lines',
    restrict_driver_to_vehicle_assignment:boolean,

    link_vehicle_to_line:boolean,
    vehicle_autoswap_line_when_out_of_bounds:boolean,
    notify_admin_when_vehicle_out_of_bounds:boolean,
    notify_admin_when_vehicle_goes_offline:boolean,
}

export class Project{
    id?:string;
    name:string;
    name_ar:string;
    publicName:string;
    publicName_ar:string;
    created_at:number;
    settings:ProjectSettings;
    

    constructor(params: Project){
        this.name=params.name
        this.name_ar=params.name_ar
        this.publicName=params.publicName
        this.publicName_ar=params.publicName_ar
        this.created_at=params.created_at
        this.settings=params.settings
        
        Object.assign(this, params);
    }
}
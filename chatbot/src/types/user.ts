
export interface User {
_id:string;
username:string;
email:string;
u_status:"ACTIVATED"|"DEACTIVATED";
u_verified:"VERIFIED"|"UNVERIFIED";
u_role:"admin"|"client";
}
/**
 * 上课
 */
import { BaseBehavior } from "./BaseBehavior";

class AttendingClass extends BaseBehavior {
    location: string | any;
    constructor(timestamp: number, location: string | any, light=true, speed = 0) {
        super(timestamp, location, light, speed)
        
    }
}
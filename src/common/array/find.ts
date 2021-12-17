import window from "../window"
if(!Array.prototype.find){
    Array.prototype.find = function(callback) {
        return callback && (this.filter(callback)|| [])[0];
    };
}
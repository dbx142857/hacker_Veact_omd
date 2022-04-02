export const EventEmitter=class  {
    constructor(vm=null) {
        if(vm){
            this.vm=vm;
        }
        
        this.events = {};

    }
    getTotalEventCount() {
        let res = 0
        for (let i in this.events) {
            res += this.events[i].length
        }
        return res;
    }
    on(event, callback,vm) {


        if (Array.isArray(event)) {
            event.forEach((evt) => {
                this.on(evt, callback)
            })
            return this;
        }

        const callbacks = this.events[event] || [];
        if (Array.isArray(callbacks)) {
            callbacks.push(callback);
            if(vm){
                callback.vmId=typeof(vm)=='string'?vm:vm.uid
            }
            this.events[event] = callbacks;
            
        }
        return this;
    }
    off(event, callback) {

        if (Array.isArray(event)) {
            event.forEach((evt) => {
                this.off(evt, callback)
            })
            return this;
        }

        const callbacks = !callback ? [] : ((this.events[event] || []).filter(
            (cb) => cb !== callback
        ));
        if (callbacks.length == 0) {
            delete this.events[event]
        } else {
            this.events[event] = callbacks;
        }

        return this;
    }
    once(event, callback) {
        if (Array.isArray(event)) {
            event.forEach((evt) => {
                this.once(evt, callback)
            })
            return this;
        }
        const wrap = (...args) => {
            typeof callback === "function" && callback.apply(this, args);
            this.off(event, wrap);
        };
        this.on(event, wrap);
        return this;
    }
    emit(event, ...args) {
        const callbacks = this.events[event] || [];
        if (Array.isArray(callbacks)) {
            try {
                callbacks.forEach((cb) => typeof cb === "function" && cb.apply(null, args.concat(event)));
            } catch (e) {
                console['warn']('exec bus emit error--:', e)
            }

        }
        return this;
    }
};
export default class bus{
    
    proto={
        __$BUS:()=>new EventEmitter(this.thisInstance)
    }
}
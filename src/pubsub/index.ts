type SubscribersType = {
    [key: string]: Function[];
}

export default class PubSub {

  private subscribers: SubscribersType = {};
  
  constructor() {
    this.subscribers = {};
  }

  subscribe(event: string, callback: Function) {
    if (!Array.isArray(this.subscribers[event])) {
      this.subscribers[event] = [];
    }
    //on subscribe we will we will push callback to this.subscribers[event] array
    this.subscribers[event].push(callback);
    const index = this.subscribers[event].length - 1;

    // subscribed callbacks to be removed when they are no longer necessary.
    return {
      unsubscribe() {
        this.subscribers[event].splice(index, 1);
      },
    };
  }

  publish(event: string, ...data: any) {
    // return if event is not subscribed
    if (!Array.isArray(this.subscribers[event])) {
      return;
    }

    // Whenever you publish any event, it will trigger callback for all stored event in subscriber object
    this.subscribers[event].forEach((callback: Function) => {
      callback(...data);
    });
  }
}

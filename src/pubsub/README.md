# example

components communication in vue2.
```
// event-bus.js

import Vue from 'vue'
export const EventBus = new Vue()
```

```
// component A
import { EventBus } from "./event-bus.js";

EventBus.$on("myevent", args => {
		console.log(args)
})

// component B
import { EventBus } from "./event-bus.js";

EventBus.$emit("myevent", 'some args')
```
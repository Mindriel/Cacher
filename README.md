# Cacher

[![npm version](https://badge.fury.io/js/Cacher.svg)](https://badge.fury.io/js/Cacher)
[![GitHub version](https://badge.fury.io/gh/Mindriel%2FCacher.svg)](https://badge.fury.io/gh/Mindriel%2FCacher)
[![Build Status](https://api.travis-ci.org/Mindriel/Cacher.svg?branch=master)](https://travis-ci.org/Mindriel/Cacher/branches)
[![Dependencies](https://david-dm.org/Mindriel/Cacher.svg)](https://david-dm.org/Mindriel/Cacher)
[![devDependencies](https://david-dm.org/Mindriel/Cacher/dev-status.svg)](https://david-dm.org/Mindriel/Cacher?type=dev)
[![Code Climate](https://codeclimate.com/github/Mindriel/Cacher/badges/gpa.svg)](https://codeclimate.com/github/Mindriel/Cacher)
[![Test Coverage](https://codeclimate.com/github/Mindriel/Cacher/badges/coverage.svg)](https://codeclimate.com/github/Mindriel/Cacher/coverage)

Simple library for caching more complex function calls.

Can be used with react not to trigger rerendering by constantly creating new functors for components props.  
Yet it has **no dependencies** to React or any other lib.

### Installation
```
npm install --save Cacher
```

### Simple Example
Let's say You have a component that receives a functor and renders N subcomponents.  
Each subcomponent receives a callback which is the functor called with the subcomponents index.
You could write:
```javascript
class Component extends React.Component {
  
    // ...
  
    render() {
        return Array(this.props.N).map(function(_, index) {
            return (
                <SubComponent
                    callback={function() { this.props.functor(index); }}
                />
            );
        });
    }
}
```

But this way every time You render Component each Subcomponent receives a **new** functor
as callback and needs to rerender.

What if You could get the same functor every time You know You already had one like that?

**Now you can! :)**
```javascript
import Cacher from 'Cacher';

class Component extends React.Component {
  
    // ...

    cacher = new Cacher()
        .functor(this.props.functor)
        .create();
  
    render() {
        return Array(this.props.N).map(function(_, index) {
            return (
                <SubComponent
                    callback={function() { this.cacher(index); }}
                />
            );
        });
    }
}
```
Voilà!  
The first time this.cacher is called with an index it creates one callback function and returns it.  
Every next time for the same index it just returns the one created before (same object/reference).


### Object Oriented example

You can also add a context to the main functor.  
Just use
```javascript
.constext(object)
```
to make Cacher call
```object.functor(index)``` instead of ```functor(index)```.

### Multiply callbacks example

Cacher is configurable to accept an additional function (called **action**) aside with index.  
You just need to tell him which parameter will it be.  
E.g.:
```javascript
import Cacher from 'Cacher';

class Component extends React.Component {
  
    // ...

    cacher = new Cacher()
        .context(someObject)
        .functor(this.props.functor)
        .action(1)
        .create();
  
    render() {
        return arrayOfFunctions.map(function(someFunction, index) {
            return (
                <SubComponent
                    callback={function() { this.cacher(index, someFunction); }}
                />
            );
        });
    }
}
```
Now ```this.cacher(index, someFunction)``` will return something functionally identical to:
```javascript
function() {
    someFunction();
    return this.props.functor.call(someObject, index);
}
```

### Clearing cache
You can clear the inside cache:
```javascript
function someFn(/* some arguments */) {
    /* do sth */
}
const cacher = new Cacher().functor(someFn);
const getter = cacher.create();

const f34 = getter('34');

/* use getter */

cacher.clear();
const f34_prim = getter('34');
// Here ( f34 !== f34_prim )
```

### Additional/Call/Runtime arguments
Also additional arguments can be passed.
```javascript
const base = {};
function addError(component, error) {
    if (!base[component]) { base[component] = [] }
    if (base[component].includes(error)) { return; }
    base[component].push(error);
}

const getter = new Cacher().functor(addError).create();

getter('component1')('sth');
getter('component1')('probably');
getter('component2')('could be');
getter('component1')('wrong');
getter('component1')('wrong');

expect(base).to.deep.equal({
    'component1': ['sth', 'probably', 'wrong'],
    'component2': ['could be']
});
```


### More to it
You can index by any simple type:
 - number
 - string
 - reference
 
### Remember !
The function returned by **create** assumes the first argument it gets is the **index**,
by which Cacher distinguishes cached material.

### Final words
Feel free to comment and add suggestions.

This is my first lib I created and published to see how NPM works.  
I am eager to enhance it if it proves useful to someone.

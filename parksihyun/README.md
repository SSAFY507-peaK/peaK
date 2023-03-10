# TypeScript 학습



## 1. TypeScript를 쓰는 이유를 알아보자

- JavaScript (동적언어)
  - 런타임(실행되는 시점)에 타입 결정 / 오류 발견
  - 개발자의 실수를 사용자가 볼 수 있다.
- Java, TypeScript (정적언어)
  - 컴파일 타임에 타입 결정 / 오류 발견

### JavaScript

```jsx
function add(num1, num2) {
    console.log(num1 + num2) 
}

add()                   // NaN
add(1)                  // NaN
add(1, 2)               // 3
add(3, 4, 5)            // 7
add('hello', 'world')   // 'helloworld'

// add(1, 2) 를 제외하고 원하는 결과가 아니다!
// 하지만 JavaScript는 에러 출력하지 않고 정상적으로 실행됨
```

```jsx
function showItems(arr) {
    arr.forEach((item) => {
        console.log(item)
    })
}

showItems([1, 2, 3])
// 1
// 2
// 3

showItems(1, 2, 3)
// Uncaught TypeError
// 1이라는 숫자는 forEach라는 메서드 없음
```

### TypeScript

```tsx
function add(num1, num2) {
    console.log(num1 + num2) 
}

add()                   // NaN
add(1)                  // NaN
add(1, 2)               // 3
add(3, 4, 5)            // 7
add('hello', 'world')   // 'helloworld'
```

```tsx
// num1, num2에 type을 부여하자

function add(num1:number, num2:number) {
    console.log(num1 + num2) 
}

// add()                   // NaN
// add(1)                  // NaN
add(1, 2)               // 3
// add(3, 4, 5)            // 7
// add('hello', 'world')   // 'helloworld'

// 이제 함수를 만들었던 때의 의도가 아니면 에러가 표시됨
```

---

```tsx
function showItems(arr) {
    arr.forEach((item) => {
        console.log(item)
    })
}

showItems([1, 2, 3])
// 1
// 2
// 3

showItems(1, 2, 3)
// Uncaught TypeError
// 1이라는 숫자는 forEach라는 메서드 없음
```

```tsx
function showItems(arr:number[]) {
    arr.forEach((item) => {
        console.log(item)
    })
}

showItems([1, 2, 3])
// 1
// 2
// 3

showItems(1, 2, 3)
// Uncaught TypeError
```

## 2. 기본 타입

```tsx
let car:string = 'bmw'

let age:number = 30

let isAdult:boolean = true

let a1:number[] = [1, 2, 3]
let a2:Array<number> = [1, 2, 3]

let week1:string[] = ['mon', 'tue', 'wed']
let week2:Array<string> = ['mon', 'tue', 'wed']
```

```tsx
// 튜플 (Tuple)

// 인덱스별로 타입이 다를 때 사용 가능
let b:[string, number]
b = ['z', 1] // 가능
// b = [1, 'z'] // 불가능

b[0].toLowerCase()   // 가능
b[1].toLowerCase()   // 불가능
```

```tsx
// void, never

// void 는 함수에서 반환값이 없을 때 사용
function sayHello():void {
    console.log('hello')
}

// never는 항상 에러를 반환하거나 영원히 끝나지 않는 경우
function showError():never {
    throw new Error()
}

function infLoop():never {
    while (true) {
        // do something
    }
}
```

```tsx
// enum
// 비슷한 값끼리 묶음

enum Os {
    Window,
    Ios,
    Android
}

// ex) Andriod에 마우스 hover해보면
// (enum member) Os.Android = 2 라고 뜬다
// enum에 수동으로 값을 주지 않으면 0부터 자동으로 값이 할당

//////////////////////////////////////////////////////////

enum Os {
    Window = 3,
    Ios,
    Android
}

// ex) Andriod에 마우스 hover해보면
// (enum member) Os.Android = 5 라고 뜬다

//////////////////////////////////////////////////////////

enum Os {
    Window = 3,
    Ios = 10,
    Android
}

// ex) Andriod에 마우스 hover해보면
// (enum member) Os.Android = 11 이라고 뜬다

// enum 은 양방향 매핑 가능
console.log(Os[10])         // "Ios"
console.log(Os['Ios'])      // 10

//////////////////////////////////////////////////////////

// enum 에는 숫자가 아닌 문자열도 입력 가능
// 이 경우에는 단방향 매핑
enum Os {
    Window = 'win',
    Ios = 'ios',
    Android = 'and'
}

// 위 코드는 아래 형식으로 컴파일됨 //
const Os = {
    Window : 'win',
    Ios : 'ios',
    Android : 'and'
}
////

// myOs에는 Window, Ios, Android만 입력 가능
let myOs:Os

// 이런 식으로 입력 가능
myOs = Os.Window

// 특정 값만 입력하도록 강제하고 싶을 때
// 그 값들이 공통점이 있을 때
// enum 사용
```

```tsx
// null, undefined

let a:null = null
let b:undefined = undefined
```

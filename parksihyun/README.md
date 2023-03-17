# TypeScript 학습

### TypeScript

## = JavaScript + Type 문법

---

## 왜 사용할까?

1. 타입
   - JavaScript는 Dynamic Typing 가능
     - 코드 길게 짤 땐 자유도&유연성은 나쁜 요인
   - TypeScript는 타입 엄격히 검사함
2. Error Message 퀄리티가 JavaScript에 비해 자세함
   - TyperScript를 언어보다는 코드 에디터 부가기능 역할로 봐도 무방

---

## React PJT에서 Typescript 사용할 경우

1. 이미 있는 React PJT에 설치하는 경우
   
   ```jsx
   npm install --save typescript @types/node @types/react @types/react-dom @types/jest
   ```
   
   - 이제 .js 파일을 .ts 파일로 바꿔서 이용가능

2. React PJT 새로 만드는 경우
   
   ```jsx
   npx create-react-app my-app --template typescript
   ```

---

## 컴파일

브라우저는 .ts 파일 읽지 못함

⇒ 따라서 .js 파일로 변환해야 함

⇒ 터미널 켜서 `tsc -w` 입력해두면 자동 변환됨

- 이 변환되는 과정을 `컴파일` 이라고 함
  - 컴파일 옵션을 `tsconfig.json` 에 설정함

[tsconfig](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/322f0124-40a1-4a21-970b-0014e5b02d5a/Untitled.json)

---

## 간단한 변수 타입 지정 가능

- `let 이름 :string = 'kim'`
  
  - `이름`이라는 변수엔 string type만 들어올 수 있음

- 변수 타입
  
  - string, number, boolean, null, undefined, bigint, [ ], { } 등

- `let 이름 :[] = ['kim', 'park']`
  
  - 하지만 array 안 물품들의 타입 지정해야 함
  - array 타입 지정
    - `let 이름 :string[] = ['kim', 'park']`
      - `이름`변수에는 string이 담긴 array만 들어올 수 있음
  - object 타입 지정
    - `let 이름 :{ name : string } = { name : ‘kim’ }`
      - `let 이름 :{ name? : string } = { name : ‘kim’ }`
        - 이렇게 하면 name 속성이 옵션이라는 뜻

- 다양한 타입이 들어올 수 있게 하려면 Union type
  
  - `let 이름 :string | number = 'kim'`
    - `이름` 변수에는 string 혹은 number가 들어옴
  - `let 이름 :string[] | number = 123`
    - `이름` 변수에는 string이 담긴 array나 number 들어옴

- 타입은 변수에 담아서 사용 가능 : `Type alias`
  
  ```jsx
  type Name = string | number
  
  let 이름 :Name = 123
  ```
  
  - 타입명은 대문자로 보통 작명함
    - 일반 변수와 차별화해서 관리

- `literal type`
  
  ```jsx
  type NameType = 'kim' | 'park'
  let 이름 :NameType = 'kim'
  ```
  
  - `이름` 이라는 변수에 ‘kim’ 또는 ‘park’ 만 들어올 수 있음

- 함수 만들 때도 타입 지정 가능
  
  ```jsx
  function 함수(x :number) :number {
      return x * 2
  }
  ```
  
  - 위 함수는 파라미터로 number, return 값으로 number

- array에 쓸 수 있는 tuple 타입
  
  ```jsx
  // 무조건 1st는 number, 2nd는 boolean
  
  type Member = [number, boolean]
  let john :Member = [123, true]
  ```

- object에 타입 지정해야 할 속성이 너무 많은 경우
  
  ```jsx
  type Member = {
      name : string
  }
  
  let john :Member = { name : 'kim' }
  ```
  
  - john이라는 변수는 {name : string} 이런 변수만 가능
  
  - 만약 name 뿐 아니라, age 등등 매우 많은 속성들이 들어간다면?
    
    ```jsx
    type Member = {
        [key : string] : string
    }
    
    // [key : string] => 모든 object 속성
    // [key : string] : string => 글자로 된 모든 object 속성의 타입은 :string
    ```

---

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

## 3. 인터페이스

```jsx
let user:object

user = {
    name: 'xx',
    age: 30
}

console.log(user.name) // error 메세지 뜸
                                           // Property 'name' does not exist on type 'object'.
```

```jsx
interface User {
    name : string;
    age : number;
}

let user : User = {

}      // error 메세지 뜸
             // Type '{}' is missing the following properties from type 'User': name, age
```

```jsx
interface User {
    name : string;
    age : number;
}

let user : User = {
    name: 'xx',
    age: 30
}      

console.log(user.age)  // 30
```

```jsx
// gender를 option으로 지정해보자

interface User {
    name : string;
    age : number;
    gender? : string;
}

let user : User = {
    name: 'xx',
    age: 30
}      

user.gender = "male"

console.log(user.age)     // 30
console.log(user.gender)  // male
```

```jsx
// 읽기 전용 property를 만들어보자

interface User {
    name : string;
    age : number;
    gender? : string;
    readonly birthYear : number;
}

let user : User = {
    name: 'xx',
    age: 30,
    birthYear : 2000,     // 최초 생성 시만 할당 가능, 이후 수정 불가
}      

user.birthYear = 1990;  // 읽기 전용 속성이므로 수정 불가
```

```jsx
// number를 key로, string을 value로 하는 property 여러 개 받을 수 있음

interface User {
    name : string;
    age : number;
    gender? : string;
    readonly birthYear : number;
    [grade:number] : string;
}

let user : User = {
    name: 'xx',
    age: 30,
    birthYear : 2000,
    1 : 'A',
    2 : 'B'
}
```

```jsx
// 위의 경우를 문자열 리터럴로 해보자
// 위의 경우에 string이라면 무엇이든 입력 가능하지만,
// 지금은 A, B, C, D 만 입력 가능

type Score = 'A' | 'B' | 'C' | 'F';

interface User {
    name : string;
    age : number;
    gender? : string;
    readonly birthYear : number;
    [grade:number] : Score;
}

let user : User = {
    name: 'xx',
    age: 30,
    birthYear : 2000,
    1 : 'A',
    2 : 'B'
}
```

---

인터페이스로 함수도 정의할 수 있다.

```jsx
interface Add {
    (num1:number, num2:number): number;
}

const add : Add = function(x, y) {
    return x + y;
}

add(10, 20)   // 30

------------------------------------------

interface IsAdult {
    (age:number):boolean;
}

const a:IsAdult = (age) => {
    return age > 19
}

a(33)     // true
```

---

인터페이스로 클래스도 정의할 수 있음

```jsx
// implements

interface Car {
    color: string;
    wheels: number;
    start(): void;
}

class Bmw implements Car {
    color;
    wheels = 4;

    constructor(c:string){
        this.color = c;
    }

    start() {
        console.log('go...')
    }
}

const b = new Bmw('green')
console.log(b)
// Bmw: {
//   "wheels": 4,
//   "color": "green"
//  }

b.start()   // "go.."
```

---

인터페이스는 확장이 가능함

```jsx
//extends

interface Car {
    color: string;
    wheels: number;
    start(): void;
}

// Car가 있을 때
// 이미 Car가 가지고 있던 속성 그대로 가짐
// 문의 개수나 추가 함수 정의 가능
interface Benz extends Car {
    door: number;
    stop(): void;
}

const benz : Benz = {
    door : 5,
    stop(){
        console.log('stop')
    },
    color : 'black',
    wheels : 4,
    start(){
        console.log('go...')
    }
}
```

---

확장은 여러 개 가능

```jsx
interface Car {
    color: string;
    wheels: number;
    start(): void;
}

interface Toy {
    name: string;
}

interface ToyCar extends Car, Toy {
    price : number;
}
```

## 4. 함수

```tsx
// 복습

function add(num1: number, num2: number): number {
    return num1 + num2;
}

function add(num1: number, num2: number): void {
    console.log(num1 + num2);
}

function isAdult(age: number): boolean {
    return age > 19;
}
```

```tsx
// 인터페이스처럼 함수의 매개변수도 optional로 지정 가능
// 선택적 매개변수 라고 부름

function hello(name?: string) {
    return `Hello, ${name || "world"}`;
}

const result = hello();
console.log(result)     // Hello, world

// 참고로, JavaScript에서는 매개변수에 default를 줄 수 있음
// 따라서 아래처럼 쓸 수도 있음

function hello(name = "world") {
    return `Hello, ${name}`;
}
```

```tsx
// 이름과 나이를 받아서, 문자열을 출력해보자

function hello(name:string, age?:number):string {
    if (age !== undefined) {
        return `Hello, ${name}. You are ${age}.`;
    } else {
        return `Hello, ${name}.`;
    }
}

// 주의할 점!!
// 첫째 줄이 "function hello(age?:number, name:string):string {" 이면 불가!!
// 선택적 매개변수가 필수 매개변수보다 앞에 오면 에러 발생
// 만약 굳이 앞에 두고 싶다면?

function hello(age: number | undefined, name: string):string {
    if (age !== undefined) {
        return `Hello, ${name}. You are ${age}.`;
    } else {
        return `Hello, ${name}.`;
    }
}

console.log(hello(30, "Sam"));
console.log(hello(undefined, "Sam"));
```

---

## Three.js 실습

### 회전하는 정육면체 만들기

```jsx
npm install three
npm install @react-three/fiber
npm install @react-three/drei
```

```jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <>
      <Canvas>

        {/* 마우스 휠로 회전, 확대/축소 가능, autoRotate={true} 하면 자동회전 */}
        <OrbitControls />

        {/* 3D 도형을 감쌀 mesh 태그 */}
        <mesh>  
          {/* 1:1:1 비율의 정육면체 */}
          <boxGeometry args={[1, 1, 1]} />
          {/* 색상 추가 */}
          <meshStandardMaterial attach="material" color={0xa3b18a} />
          {/* 조명 추가. default는 1. directionalLight는 방향이 있음 */}
          <ambientLight intensity={1} />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
```

```jsx
// html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

    <canvas id="canvas" width="300" height="300"></canvas>

    <script type="importmap">
        {
            "imports": {
            "three": "<https://unpkg.com/three@0.141.0/build/three.module.js>",
            "GLTFLoader" : "<https://unpkg.com/three@0.141.0/examples/jsm/loaders/GLTFLoader.js>"
            }
        }
    </script>

    <script type="module">
        // import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
        import { GLTFLoader } from 'GLTFLoader'
        import * as THREE from 'three'

        let scene = new THREE.Scene();
        let renderer = new THREE.WebGLRenderer()
        // 원래 색 되찾기
        renderer.outputEncoding = THREE.sRGBEncoding

        // 3d model 은 1.카메라 2.조명 3.배경 필요
        // camera는 PerspectiveCamera(원근법O), OrthographicCamera(원근법X) 2가지
        let camera = new THREE.PerspectiveCamera(30, 1)
        // camera 좌표 설정
        camera.position.set(0,0,5)

        // 배경
        scene.background = new THREE.Color('white')

        // 조명
        // AmbientLight  ,  PointLight  ,  DirectionalLight
        let light = new THREE.DirectionalLight(0xffff00, 10)
        scene.add(light)

        // GLTF 파일 가져오기
        let loader = new GLTFLoader()
        // 로딩이 오래 걸리니 콜백 함수 설정해 로딩 끝난 후 작업 지정
        loader.load('shiba/scene.gltf', function(gltf) {
            scene.add(gltf.scene)

            // 애니메이션 주지 않을 때는 이거 활성화
            // renderer.render(scene, camera)

            // 애니메이션 주고 싶다면?
            function animate() {
                requestAnimationFrame(animate)
                //회전
                gltf.scene.rotation.x += 0.03
                gltf.scene.rotation.y += 0.03
                gltf.scene.rotation.z += 0.03
                // 마우스컨트롤
                // Three.js 내의 OrbitControl 사용
                renderer.render(scene, camera)
            }
            animate()

        })

    </script>

</body>
</html>
```

---

## React ToolKit 학습

- Redux store에 state 보관하는 법

```jsx
import { configureStore, createSlice } from '@reduxjs/toolkit';

// useState의 역할과 비슷
// state 하나를 slice라고 부름
// createSlice({
//    name : 'state 이름',
//     initialState : '값',
//})

let user = createSlice({
    name : 'user',
    initialState : 'kim'
})

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

// 위에서 정의된 state를 아래에 등록해야 사용 가능
export const store = configureStore({
  reducer: {
        // 작명 : user.reducer
        user : user.reducer,
        stock: stock.reducer
  },
});
```

- Redux store의 state 꺼내는 법
  
  ```jsx
  import { useSelector } from "react-redux"
  
  // Redux store에 있던 모든 state 남음
  let a = useSelector((state)=>{ return state })
  
  console.log(a)         // {user: 'kim', stock: Array(3)}
  console.log(a.user)    // kim
  console.log(a.stock)   // [10, 11, 12]
  ```
  
  - 참고) useSelector 편하게 쓰려면
    
    ```jsx
    let a = useSelector((state)=>{ return state.user })
    
    console.log(a)      // kim
    
    // JS 문법 잘 알고 있다면..?
    let a = useSelector(state => state.user )
    ```
  
  - state가 컴포넌트간 공유가 필요없으면 그냥 useState() 사용하기
    
    - Redux store에 모든 것을 넣을 필요가 없다

- store의 state 변경하는 법
  
  - state 수정해주는 함수 만들기
  - 원할 때 그 함수 실행해달라고 store.js에 요청
  
  ```jsx
  import { configureStore, createSlice } from '@reduxjs/toolkit';
  
  let *user* = createSlice({
      name : 'user',
      initialState : 'kim',
  
  /////////////////////////////////////////////////////
      1. state 수정해주는 함수 만들기
      reducers : {
          changeName(state) {             // state : 기존 state를 뜻함
              return 'john kim'
          }
      }
  /////////////////////////////////////////////////////
  })
  
  /////////////////////////////////////////////////////
  2.
  // state 변경 함수들이 object 형식으로 남을 것
  // 오른쪽 object를 변수로 빼는 문법
  // export let { changeName, 함수2, ... } = user.actions
  export let { changeName } = *user*.actions
  /////////////////////////////////////////////////////
  
  let stock = createSlice({
      name : 'stock',
      initialState : [10, 11, 12]
  })
  
  export const store = configureStore({
    reducer: {
          user : *user*.reducer,
          stock: stock.reducer
    },
  });
  
  /////////////////////////////////////////////////////
  3. 만든 함수 import 해서 사용
  import { useDispatch, useSelector } from "react-redux"
  import { changeName } from "./../store.js"
  
  function Cart() {
      // 다른 코드들...
      let state = useSelector((state)=>state)
  
      // store.js로 요청을 보내주는 함수임
      let dispatch = useDispatch()
  
      <button onClick={() => {
          // dispatch(state변경함수()) 형식으로 사용
          dispatch(changeName())
      }) + </button>
  }
  /////////////////////////////////////////////////////
  ```
  
  요약) Redux state 변경하려면
  
  1. `state 변경해주는 함수 만들기`
  2. `export`
  3. `dispatch(state 변경함수())`
     1. dispatch는 state 변경함수 실행해달라고 store.js에 부탁

- state가 object/array일 경우 변경하는 법
  
  - 이렇게 해도 되긴 하지만
    
    ```jsx
    import { configureStore, createSlice } from '@reduxjs/toolkit';
    
    let user = createSlice({
        name : 'user',
        initialState : { name : 'kim', age : 20 },
        reducers : {
            changeName(state) {             
                return { name : 'park', age : 20 }
            }
        }
    })
    
    export let { changeName } = user.actions
    ```
  
  - array/object의 경우 **직접 수정**해도 state 변경됨
    
    ```jsx
    import { configureStore, createSlice } from '@reduxjs/toolkit';
    
    let user = createSlice({
        name : 'user',
        initialState : { name : 'kim', age : 20 },
        reducers : {
            changeName(state) {             
                state.name = 'park'
            }
        }
    })
    
    export let { changeName } = user.actions
    ```
    
    - 결론 : state가 object/array 면 return 없이 직접 수정해도 됨!!
      - 그래서 문자 하나만 필요해도 일부러 {} 안에 담기도 함
        - ex) `initialState : ‘kim’` ⇒ `initialState : { name : ‘kim’ }`

- +1 말고 가끔 +10, +100 하고 싶을 때 함수 여러 개 만들면 비효율적
  
  ⇒ 함수는 `파라미터 문법` 을 이용하면 비슷한 함수 여러 개 만들 필요가 없음
  
  - state 변경 함수에도 파라미터 문법 사용 가능
  - 파라미터 뚫어놓으면 비슷한 함수 여러 개 필요 없음
  - 파라미터 작명은 보통 action으로 함
    - 화물 뿐 아니라 action에 대한 여러 정보가 들어있기 때문
      - action : state 변경 함수
  
  ```jsx
  let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
      increase(state, action){
        state.age += action.payload   // action.payload : 화물 보낸 것 출력 문법
      }
    }
  })
  
  dispatch(increase(100))            // 100은 메시지에 실어보내는 화물
  ```
  
  - state변경함수의 둘째 파라미터를 작명하면 increase(10) 처럼 파라미터입력을 해서 함수사용이 가능합니다.
  - 파라미터자리에 넣은 자료들은 a.payload 하면 나옴
    - payload : 화물, 소포, 택배
  - increase(10) : +10 됨
  - increase(100) : +100 됨

- 코드가 길다면 알아서 import export 쓰면 됨
  
  - store/userSlice.js 여기에 slice 하나 보관해보자
    
    ```jsx
    import { createSlice } from '@reduxjs/toolkit'
    
    let user = createSlice({
        name : 'user',
        initialState : { name : 'kim', age : 20 },
        reducers : {
            changeName(state){
                state.name = 'park'
            },
            increase(state, action){
                state.age += action.payload
            },
        }
    })
    
    export let { changeName, increase } = user.actions
    
    export default user
    ```
    
    ```jsx
    // store.js
    import user from './store/userSlice.js'
    ```

---

## 언제 비동기적인 처리를 하는가?

- 어떠한 명령을 했을 때 그 명령이 언제 끝날지 예측하기 어려운 경우

- 주가 되는 작업이 아닌 경우
  
  - ex) 통신
    
    - 서버와 웹 브라우저의 통신은 끝나는 시간 예측 불가능
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4d5cd459-7a9d-48e0-b499-90c2f33c341a/Untitled.png)

## fetch

- `const fetchResponsePromise = fetch(resource [, init])`
  
  - resource는 url

- Return value
  
  - A Promise that resolves to a Response object.
    - 성공적으로 실행되면 Response 객체를 줄 것
  
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/395f2940-63b7-4c75-8474-78f28719c881/Untitled.png)
  
  - 함수의 리턴값이 Promise라면 그 함수는 비동기적으로 동작하는 함수일 가능성이 매우 높음
  - 그 함수의 리턴값은 2개의 메소드 이용 가능
    - then
      - 콜백 함수를 받고, 파라미터를 하나 가짐
      - `fetched.then(function(result){})`
      - fetch를 통해 실행한 결과가 성공했을 때 then으로 전달된 호출 함수가 실행됨
        - 그 결과가 파라미터
    - catch
      - 콜백 함수를 받고, 파라미터를 하나 가짐
      - `fetched.catch(function(reason){})`
      - fetch를 통해 실행한 결과가 실패했을 때 catch으로 전달된 호출 함수가 실행됨
        - 그 이유가 파라미터

- Promise를 사용하는 이유
  
  1. 비동기적인 작업을 처리할 때 성공인지 실패인지를 표준화된 방법으로 처리할 수 있게 해준다.
     - 표준화된 방법
       - 성공했을 때는 then으로 전달된 함수가 실행됨
       - 실패했을 때는 catch로 전달된 함수가 실행됨
  
  ```jsx
  // Nested promise
  fetch('<https://jsonplaceholder.typicode.com/posts>')
      .then(function(response){
          response.json().then(function(data){
              console.log('data', data)
          })
      .catch(function(reason){
          console.log('reason', reason)
  })
  ```
  
  ```jsx
  // Promise chaining
  // 1번째 방법보단 얘를 많이 씀.
  fetch('<https://jsonplaceholder.typicode.com/posts>')
      .then(function(response){
          return response.json()
          // response.json() 도 실행하면 Promise. 얘를 return 한 것
          })
      .catch(function(reason){
          console.log('reason', reason)
      .then(function(data){
          console.log('data': data)
  })
  ```

## New promise

```jsx
<script>
    var job1 = new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve('resolved ok!')
        }, 2000)
    })
    job1.then(function(data){
        console.log('data', data)
    })
</script>
```

```jsx
<script>
function job1() {
        return new Promise(function(resolve, reject){
            setTimeout(function() {
                resolve('resolved ok!')
            }, 2000)
        })
        }
    job1().then(function(data){
        console.log('data', data)
    })
</script>
```

## async, await

- promise 적용 전
  
  ```jsx
  timer(1000, function(){
      console.log('작업')
      timer(1000, function(){
          console.log('작업')
          timer(1000, function(){
              console.log('작업')
          })
      })
  })
  ```

- promise 적용 후
  
  ```jsx
  timer(1000)
      .then(function(){
          console.log('작업')
          return timer(1000)
      })
      .then(function(){
          console.log('작업')
          return timer(1000)
      })
      .then(function(){
          console.log('작업')
          return timer(1000)
      })
  ```

- JS 선배님들의 욕심은 끝이 없다.
  
  ```jsx
  then, function, return 등등이 없이 마치 동기적으로 작동하는 것처럼
  
  timer(1000)
  
  console.log('작업')
  timer(1000)
  
  console.log('작업')
  timer(1000)
  
  console.log('작업')
  
  비동기적인 코드가 동기적인 코드와 똑같이 작동하도록 하고 싶다!
  ```
  
  - 이를 위해서는 제약 조건이 있다!
    
    1. 비동기적인 함수 앞에 함수가 실행되기를 기다리라는 `await` 붙여라
    2. await가 붙어있는 promise를 return하는 함수는 반드시 다른 함수 안에서 실행되어야!
       1. 그 함수는 async라는 키워드가 앞에 붙어 있어야 한다
    
    ```jsx
    async function run() {
        await timer(1000)
    
                    console.log('작업')
        await    timer(1000)
    
                    console.log('작업')
        await    timer(1000)
    
                    console.log('작업')
        }
    
    run()
    ```

## async, await 예제

```jsx
function timer(time) {
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(time)
        }, time)
    })
}

timer(1000).then(function(time){
    console.log('time:' + time)
    return timer(time+1000)
}).then(function(time){
    console.log('time:' + time)
})
```

```jsx
function timer(time) {
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(time)
        }, time)
    })
}

async function run() {
    console.log('start');
    var time = await timer(1000)
    console.log('time:'+time)
    var time = await timer(time+1000)
    console.log('time:'+time)
    var time = await timer(time+1000)
    console.log('time:'+time)
    console.log('end')
}
run()
```

만약

```jsx
function timer(time) {
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(time)
        }, time)
    })
}

async function run() {
    console.log('start');
    var time = await timer(1000)
    console.log('time:'+time)
    var time = await timer(time+1000)
    console.log('time:'+time)
    var time = await timer(time+1000)
    console.log('time:'+time)
    console.log('end')
}
console.log('parent start')
run()
console.log('parent end')
```

를 하면 parent end가 마지막이 아니다. 비동기적이므로!

- `console.log(run())` 을 하면 `Promise` 가 리턴됨.

```jsx
function timer(time) {
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(time)
        }, time)
    })
}

async function run() {
    console.log('start');
    var time = await timer(1000)
    console.log('time:'+time)
    var time = await timer(time+1000)
    console.log('time:'+time)
    var time = await timer(time+1000)
    console.log('time:'+time)
    console.log('end')
}

async function run2() {
    console.log('parent start')
    await run()
    console.log('parent end')
}
```

를 실행하면 parent end가 마지막에 뜬다.

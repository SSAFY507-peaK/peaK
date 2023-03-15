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

# Creating a project

- 터미널에서 nextjs 최신버전 타입스크립트로 생성<br>
  `npx create-next-app@latest --typescript`

- code '프로젝트명'으로 실행<br>
  `code nextjs-intro-typescript`

# Library vs Framework

- Library는 사용자가 가져다가 원할 때 부르고 원할 때 사용(React.js)
- Framework는 사용자가 규칙을 따라 적절한 곳에 코드를 넣으면 Framework가 그 코드를 호출하여 사용(Next.js)

# Pages

- function을 default로 export한 component의 파일명을 url로 사용한다. 이때 파일명과 url명이 일치하지 않는다면 404 페이지를 부르는데 후에 커스터마이징이 가능하다. default로 export하지 않는다면 해당 페이지에서 에러가 발생한다.

# Static Pre rendering

- create react app은 기본적으로 CSR(Client-Side Rendering)이다.

  - CSR : 유저가 보는 UI를 모두 브라우저가 만든다. 비어있는 HTML을 가져오고 브라우저가 모든 자바스크립트를 요청해서 자바스크립트와 reactjs를 실행시키고 그 후에 앱이 유저에게 보여진다. 이때 느린 연결(Slow 3G)을 하게 되면 흰 화면을 볼 수도 있는데 이때 자바스크립트를 요청하는 중인 것

- nextjs에선 정적으로 앱에 있는 페이지들이 초기 상태로 미리 렌더링된다.

  - 느린 연결이나 자바스크립트가 비활성화 되어 있어도 적어도 HTML은 볼 수 있다.(API를 통해 가져오는 정보는 제외)

  - hydration : nextjs의 서버에서 페이지를 만들고 rendering이 끝나면 HTML을 만드는데 이를 페이지의 소스 코드에 넣어준다. 그 후 reactjs가 로딩되었을 때 상호작용이 가능한 react 앱이 된다. 여기서 자바스크립트 코드들이 이전에 있던 HTML에 자리를 찾아 채워지는 과정이 hydration(수화)이다.

# Routing

- nextjs에서는 새로고침이 발생되는 \<a> tag를 사용하지 않고 Link component를 추가하여 href를 달아주고 그 안에 \<a> 태그를 넣어주어 style, className 등을 사용한다.
  `<Link href="/"><a>링크</a></Link>`
- useRouter hook : location에 대한 정보(pathname, asPath, push ...)를 담고 있는 router 객체를 얻을 수 있다.

# CSS module

- CSS module은 클래스 이름을 추가할 때 텍스트가 아닌 자바스크립트 오브젝트의 프토퍼티로 작성

  - className="nav"는 동작하지 않음, className={styles.nav}로 작성

  - 개발자 도구에서 실제 클래스 이름을 확인해보면 NavBar_nav\_~~~ 와 같이 되어 있어 충돌이 생기지 않는다(다른 component에서도 nav라는 클래스 이름을 사용할 수 있다).

  - 여러 클래스를 넣고 싶을 경우
    1. \`\` 안에 ${표현식}, \`\${style1} \${style2}\`
    2. 배열을 문자열로 합치기, [style1, style2].join(" ")으로

- 단점 : 파일을 분리해야 하고 왔다갔다하며 클래스 이름을 확인해야 함

# Styled JSX

- 해당 component에 직접 CSS를 작성하는 nextjs의 라이브러리로 파일을 import하지 않아도 되고, 부모 component와 독립적으로 사용되기 때문에 스타일들이 이 component로 한정된다.

- 클래스 이름이 jsx-~~~로 생성되어 충돌이 생기지 않는다.

- \<style> 태그 안에 jsx라는 프로퍼티를 주고 {` `} 안에 작성

# Custom App

- nextjs는 pages 폴더의 페이지들을 렌더링 하기 전에 \_app.tsx를 확인하고 App() 함수의 두 가지 props(Component(active page), pageProps)를 확인한다.
  - 렌더링하려는 component를 가져다가 \_app.tsx의 App() 함수에 전달하고 return 함
- \_app.tsx를 통해 global하게 NavBar 모든 페이지에 적용 가능, global css import 가능(custom App 외의 component에서는 import 안됨), styled jsx global 예외(index.tsx) 없이 적용 가능

# Patterns

- children : reactjs의 children prop, 하나의 component를 다른 component에 넣을 때 사용

  - \_app.tsx에서 Layout component의 prop으로 사용된 <Component {...pageProps}> 가 Layout.tsx의 children으로 들어감

- reactjs의 react helmet을 설치하는 것처럼 nextjs에선 Head를 next/head를 import하여 사용햔다.

# Props type

- typescript를 사용하는 function component에서 props를 넘길 때 props 객체 자체를 넘기거나 destructuring을 사용해서 간단히 넘길 수 있다.
  1. 객체 그대로를 넘길 때는 function func(props: type), props.something 으로 사용
  2. destructuring을 해서 넘길 때는 function func({ something }: { something: type }), something 바로 사용 가능
     - interface FuncProps { something: type } 를 이용하여 type 부분 FuncProps로 대체 가능

# Fetching Data

- developers.themoviedb.org의 API를 이용하여 영화 데이터를 가져온다.

- movies를 useState를 이용하여 set할 때 초기값을 주지 않으면 undefined가 되기 때문에 map() 함수를 사용할 수 없음
  - movies가 존재하는지 확인 후 map()을 하거나
  - movies?.map()으로 사용하면 가능
- API key가 개발자도구 Network 탭의 Request URL에 노출되어 남용 시 사용량 제한에 관한 문제가 생길 수 있다.
  - redirect와 rewrite로 해결

# Redirect and Rewrite

## Redirect

- next.config.js에서 설정을 통해 redirect를 할 수 있다.

- 사용자가 url의 변화를 눈으로 확인 가능

- 사용 방법
  - 객체 배열을 리턴하는 async redirects() 함수를 module.exports 객체 안에 작성
  - pattern matching 가능
    - "/example1/:example2" : example2에 유동적인 path
    - "/example1/:example2\*" : example1/ 뒤 모두 catch
  ```
  async redirects() {
    return [
      {
        source: "여기에 왔을 때",
        destination: "여기로 보내줌",
        permanent: false, // caching
      },
      {
        // ...
      },
    ];
  },
  ```

## Rewrite

- nextjs가 request url을 masking하여 경로(api path 등)를 rewrite 하여 숨길 수 있다.

- 사용자가 url의 변화를 알 수 없음
- 사용 방법
  - async rewrites() 함수 작성
  - API_KEY를 숨기는 게 목적이므로 .env에 API_KEY=~~로 환경 변수 작성
  ```
  async rewrites() {
    return [
      {
        source: "여기로 왔을 때", // 가짜 url
        destination: `여기로 보내줌`, // 실제 요청하는 url
      },
    ];
  },
  ```

# Server Side Rendering(SSR)

- 데이터가 유효할 때 보여주기(SSR) vs loading 보여주며 데이터 가져오기(static shell 등)
  - 초기 페이지인 index.tsx에서 사용
- server에서만 동작하는 코드 작성(client에서 볼 수 없음)

- getServerSideProps()는 하나의 객체를 return하는데 props라는 key가 있고 props는 데이터를 가지는 객체이다.
  - return 하는 props를 페이지에게 전달, 여기서 props가 \_app.tsx의 pageProps로써 넘어간다.
  - props는 소스에서 \_\_NEXT_DATA\_\_라는 id로 넘겨지고, reactjs가 로딩된 후 모든 state를 관리하며 상호작용할 수 있게 한다.
- HTML 소스(option+command+U)에 가져온 데이터로 채워져있음(SEO에 유리)

- API load가 느리다면 다 가져올 때까지 사용자가 loading.. 없이 비어진 화면으로 오래 기다려야함

# Dynamic Routes

- pages 폴더에 [변수명].tsx로 이름을 지어준다.

- 변수명으로 활용한 페이지에서 useRouter()를 이용해 router 객체를 확인해보면, query라는 property가 있고 여기에 변수와 url 값이 담겨있다.

- 활용

  1. 사용자가 클릭 했을 때만 넘어가는 Link component 이용
  2. 이벤트(onClick 등) 안에 router.push() 이용

  - routing을 할 때 url string을 담을 수도 있지만 url 정보를 가진 객체도 담을 수 있고, 두 번째 prop(Link) 혹은 argument(router.push)로는 masking할 url을 적을 수 있다(query string 숨기기 가능).
  - Home에서 [id] 페이지로 넘어갔을 때에만 router 정보를 받을 수 있다.

# Catch all url

- pages 폴더에 [...변수명].tsx로 이름을 지어준다.

- component 내부에 있는 router는 client-side에서만 동작하기 때문에, 초기에 pre-render 해서 보내준 HTML에는 router.query.~~ 가 배열이 아닐 수 있기 때문에 || [](초기 빈 배열)로 에러를 해결하고 js가 도착했을 때 router 내용을 가져가게 한다(영화 상세 페이지).

- SEO에 더 유리하게 하거나 사용자가 접속하기 전에 탭의 제목(title)을 바꾸거나 하는 pre-render 동작을 원한다면 getServerSideProps()를 이용하여 server-side에서 받아오자

# tsconfig.json

- Typescript compiler 옵션에 대해 설정할 수 있는데 target을 es6로 올리면 es3, es5 보다 나중에 나온 문법을 사용할 수 있다.

- 여기서는 target을 es5로 하는 대신, downlevelIteration을 허용하여 destructuring을 사용 가능하게 했다.

# 404 page

- page 폴더에 404.tsx로 이름을 지어준다.

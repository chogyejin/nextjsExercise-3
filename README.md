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
  - CSR : 유저가 보는 UI를 모두 브라우저가 만든다. 비어있는 HTML을 가져오고 브라우저가 모든 자바스크립트를 요청해서 자바스크립트와 react.js를 실행시키고 그 후에 앱이 유저에게 보여진다. 이때 느린 연결(Slow 3G)을 하게 되면 흰 화면을 볼 수도 있는데 이때 자바스크립트를 요청하는 중인 것
- next.js에선 정적으로 앱에 있는 페이지들이 초기 상태로 미리 렌더링된다.
  - 느린 연결이나 자바스크립트가 비활성화 되어 있어도 적어도 HTML은 볼 수 있다.(API를 통해 가져오는 정보는 제외)
  - hydration : nextjs의 서버에서 페이지를 만들고 rendering이 끝나면 HTML을 만드는데 이를 페이지의 소스 코드에 넣어준다. 그 후 react.js가 로딩되었을 때 상호작용이 가능한 react 앱이 된다. 여기서 자바스크립트 코드들이 이전에 있던 HTML에 자리를 찾아 채워지는 과정이 hydration(수화)이다.

# Routing

- nextjs에서는 새로고침이 발생되는 \<a> tag를 사용하지 않고 Link component를 추가하여 href를 달아주고 그 안에 \<a> 태그를 넣어주어 style, className 등을 사용한다.
  `<Link href="/"><a>링크</a></Link>`
- useRouter hook : location에 대한 정보(pathname, asPath, push ...)를 담고 있는 router 객체를 얻을 수 있다.

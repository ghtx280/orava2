<script>
  import { initializeApp } from "firebase/app";
  import { getAnalytics, logEvent } from "firebase/analytics";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  // import Router
  // from "svelte-spa-router"
  // import {wrap}
  // from 'svelte-spa-router/wrap'
  import Loading from "./components/loading.svelte";

  import { Router, Link, Route } from "svelte-navigator";
  import { getDatabase, get, ref } from "firebase/database";

  import Nf       from "./routes/404.svelte";
  import Home     from "./routes/home.svelte";
  import Find     from "./routes/find.svelte";
  import Add      from "./routes/add.svelte";
  import More     from "./routes/more.svelte";
  import User     from "./routes/user.svelte";
  import Login    from "./routes/login.svelte";
  import Edit     from "./routes/edit.svelte";
  import Test     from "./routes/test.svelte";
  import Test2    from "./routes/test2.svelte";
  import Posts    from "./routes/posts.svelte";
  import Settings from "./routes/settings.svelte";
  import About    from "./routes/about.svelte";

  const fireApp = initializeApp({
    apiKey: "AIzaSyBMsehRdFlZkPgVzD27A3_NCz-1nA4SuY8",
    authDomain: "test-f886d.firebaseapp.com",
    databaseURL:
      "https://test-f886d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-f886d",
    storageBucket: "gs://test-f886d.appspot.com",
    messagingSenderId: "560596790548",
    appId: "1:560596790548:web:fadcd34c3ce8cbb3e42601",
  });
  logEvent(getAnalytics(fireApp), "notification_received");

  let ok, routes, authUser, users, posts;

  async function func() {
    authUser = await new Promise(res=>onAuthStateChanged(getAuth(fireApp), res))
    // console.log(authUser);
    if (!authUser) authUser = 0;
    users = await get(ref(getDatabase(), "users/public"));
    users = users.val();
    posts = await get(ref(getDatabase(), "posts"));
    posts = posts.val();

    // console.log(authUser);

    ok = true;
  }
  func();

  // get(ref(getDatabase(), "users/public")).then(e => { users = e.val()})

  function menuBtn(e) {
    // if (e === 'home') location.hash = '/'
    // if (e === 'find') location.hash = '/find'
    // if (e === 'add' ) location.hash = authUser ? '/add' : '/login'
    // if (e === 'more') location.hash = '/more'
    // if (e === 'me'  ) location.hash = authUser ? '/u/' + authUser.displayName : '/login'
  }

  if (!localStorage.lcm) localStorage.lcm = Date.now();
  if (!localStorage.npt) localStorage.npt = Date.now();
  if (localStorage.uid) {
    localStorage.clear("uid");
    location.reload();
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="../public/css/orange.css" />
  <link rel="stylesheet" href="../public/css/main.css"   />
  <script>
    if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))
  </script>
  <script src="/sw.js"></script>
</svelte:head>


{#if ok}


  <header>
    <svg
      width="114"
      height="30"
      viewBox="0 0 114 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48.5732 16.1861C48.5732 18.1694 47.9301 19.6343 46.6438 20.5806C45.3702 21.5269 43.6678 22 41.5366 22C39.4055 22 37.6967 21.5269 36.4105 20.5806C35.1368 19.6343 34.5 18.1565 34.5 16.1472V13.8528C34.5 12.5306 34.8027 11.4352 35.408 10.5667C36.0259 9.68519 36.8645 9.03704 37.9237 8.62222C38.983 8.20741 40.1873 8 41.5366 8C42.8859 8 44.0839 8.20741 45.1306 8.62222C46.1899 9.03704 47.0285 9.6787 47.6464 10.5472C48.2643 11.4157 48.5732 12.5046 48.5732 13.8139V16.1861ZM39.6072 16.5556C39.6072 17.087 39.7775 17.4954 40.1179 17.7806C40.471 18.0657 40.9439 18.2083 41.5366 18.2083C42.1293 18.2083 42.5959 18.0657 42.9364 17.7806C43.2895 17.4824 43.466 17.0676 43.466 16.5361V13.4639C43.466 12.9324 43.2895 12.5241 42.9364 12.2389C42.5959 11.9407 42.1293 11.7917 41.5366 11.7917C40.9439 11.7917 40.471 11.9343 40.1179 12.2194C39.7775 12.5046 39.6072 12.913 39.6072 13.4444V16.5556Z"
        fill="#DDDDDD"
      />
      <path
        d="M65.117 21.2028C65.1423 21.2546 65.1549 21.313 65.1549 21.3778C65.1549 21.4944 65.1107 21.5981 65.0225 21.6889C64.9468 21.7667 64.8522 21.8056 64.7387 21.8056H60.4449C60.2683 21.8056 60.1044 21.7602 59.9531 21.6694C59.8144 21.5787 59.7135 21.462 59.6504 21.3194L57.9858 17.4694H56.3969V21.2806C56.3969 21.4231 56.3465 21.5463 56.2456 21.65C56.1447 21.7537 56.0249 21.8056 55.8862 21.8056H51.8004C51.6617 21.8056 51.5419 21.7537 51.441 21.65C51.3401 21.5463 51.2897 21.4231 51.2897 21.2806V8.71944C51.2897 8.57685 51.3401 8.4537 51.441 8.35C51.5419 8.2463 51.6617 8.19444 51.8004 8.19444H59.1586C60.2935 8.19444 61.2835 8.38241 62.1284 8.75833C62.9859 9.13426 63.6416 9.6787 64.0956 10.3917C64.5496 11.1046 64.7766 11.9407 64.7766 12.9C64.7766 14.663 64.1145 15.9398 62.7904 16.7306L65.117 21.2028ZM58.7614 13.8722C59.0388 13.8722 59.2532 13.7815 59.4045 13.6C59.5558 13.4056 59.6315 13.1657 59.6315 12.8806C59.6315 12.5954 59.5558 12.3491 59.4045 12.1417C59.2658 11.9213 59.0514 11.8111 58.7614 11.8111H56.3969V13.8722H58.7614Z"
        fill="#DDDDDD"
      />
      <path
        d="M70.9546 21.1444C70.7906 21.5852 70.5069 21.8056 70.1034 21.8056H66.5283C66.4148 21.8056 66.3139 21.7667 66.2257 21.6889C66.15 21.5981 66.1122 21.4944 66.1122 21.3778L66.1311 21.2611L70.2547 8.83611C70.3051 8.66759 70.3997 8.51852 70.5384 8.38889C70.6772 8.25926 70.8663 8.19444 71.1059 8.19444H76.3645C76.6041 8.19444 76.7932 8.25926 76.9319 8.38889C77.0706 8.51852 77.1652 8.66759 77.2157 8.83611L81.3393 21.2611L81.3582 21.3778C81.3582 21.4944 81.3141 21.5981 81.2258 21.6889C81.1501 21.7667 81.0555 21.8056 80.942 21.8056H77.367C76.9635 21.8056 76.6797 21.5852 76.5158 21.1444L76.0429 19.7833H71.4275L70.9546 21.1444ZM73.7352 11.9472L72.3922 15.9917H75.0782L73.7352 11.9472Z"
        fill="#DDDDDD"
      />
      <path
        d="M96.767 8.19444C96.8805 8.19444 96.9751 8.23981 97.0508 8.33056C97.1391 8.40833 97.1832 8.50556 97.1832 8.62222L97.1643 8.75833L92.8137 21.1639C92.7506 21.3454 92.6497 21.5009 92.511 21.6306C92.3723 21.7472 92.1895 21.8056 91.9625 21.8056H87.5551C87.3281 21.8056 87.1453 21.7472 87.0066 21.6306C86.8679 21.5009 86.7733 21.3648 86.7228 21.2222L82.3344 8.75833L82.3155 8.62222C82.3155 8.50556 82.3533 8.40833 82.429 8.33056C82.5173 8.23981 82.6181 8.19444 82.7316 8.19444H86.7228C86.9498 8.19444 87.1327 8.26574 87.2714 8.40833C87.4227 8.53796 87.5236 8.68056 87.574 8.83611L89.7493 16.2833L91.9246 8.83611C91.9751 8.66759 92.0697 8.51852 92.2084 8.38889C92.3471 8.25926 92.5363 8.19444 92.7758 8.19444H96.767Z"
        fill="#DDDDDD"
      />
      <path
        d="M103.096 21.1444C102.932 21.5852 102.649 21.8056 102.245 21.8056H98.6701C98.5566 21.8056 98.4558 21.7667 98.3675 21.6889C98.2918 21.5981 98.254 21.4944 98.254 21.3778L98.2729 21.2611L102.397 8.83611C102.447 8.66759 102.542 8.51852 102.68 8.38889C102.819 8.25926 103.008 8.19444 103.248 8.19444H108.506C108.746 8.19444 108.935 8.25926 109.074 8.38889C109.212 8.51852 109.307 8.66759 109.357 8.83611L113.481 21.2611L113.5 21.3778C113.5 21.4944 113.456 21.5981 113.368 21.6889C113.292 21.7667 113.197 21.8056 113.084 21.8056H109.509C109.105 21.8056 108.822 21.5852 108.658 21.1444L108.185 19.7833H103.569L103.096 21.1444ZM105.877 11.9472L104.534 15.9917H107.22L105.877 11.9472Z"
        fill="#DDDDDD"
      />
      <rect x="0.5" width="30" height="30" rx="9" fill="#FFA500" />
      <path
        d="M5.11523 15.0001C5.11523 9.26483 9.76459 4.61548 15.4998 4.61548V4.61548C21.2351 4.61548 25.8845 9.26483 25.8845 15.0001V15.0001C25.8845 20.7354 21.2351 25.3847 15.4998 25.3847V25.3847C9.76459 25.3847 5.11523 20.7354 5.11523 15.0001V15.0001Z"
        fill="#111111"
      />
      <path
        d="M9.73096 14.9999C9.73096 12.3953 9.73096 11.093 10.4854 10.2413C10.5656 10.1509 10.6511 10.0653 10.7416 9.98518C11.5932 9.23071 12.8955 9.23071 15.5002 9.23071V9.23071C18.1048 9.23071 19.4072 9.23071 20.2588 9.98518C20.3493 10.0653 20.4348 10.1509 20.515 10.2413C21.2694 11.093 21.2694 12.3953 21.2694 14.9999V14.9999C21.2694 17.6046 21.2694 18.9069 20.515 19.7585C20.4348 19.849 20.3493 19.9346 20.2588 20.0147C19.4072 20.7692 18.1048 20.7692 15.5002 20.7692V20.7692C12.8955 20.7692 11.5932 20.7692 10.7416 20.0147C10.6511 19.9346 10.5656 19.849 10.4854 19.7585C9.73096 18.9069 9.73096 17.6046 9.73096 14.9999V14.9999Z"
        fill="#FFA500"
      />
    </svg>
  </header>
<Router>
  <section>
    <Link to={authUser ? "add" : "login"}>
      <svg
        on:click={() => menuBtn("add")}
        pointer
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="10" fill="#FFA500" />
        <path
          d="M20 11C19.1716 11 18.5 11.6716 18.5 12.5V18H13C12.1716 18 11.5 18.6716 11.5 19.5C11.5 20.3284 12.1716 21 13 21H18.5V26.5C18.5 27.3284 19.1716 28 20 28C20.8284 28 21.5 27.3284 21.5 26.5V21H27C27.8284 21 28.5 20.3284 28.5 19.5C28.5 18.6716 27.8284 18 27 18H21.5V12.5C21.5 11.6716 20.8284 11 20 11Z"
          fill="#111111"
        />
      </svg>
    </Link>
    <Link to="/">
      <svg
        on:click={() => menuBtn("home")}
        pointer
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.8689 9.51317C19.1949 9.29789 19.5741 9.20472 19.944 9.22371C20.313 9.20126 20.6924 9.29045 21.02 9.50185L32.1935 16.7126C32.9649 17.2104 33.157 18.1973 32.6225 18.9169C32.0881 19.6366 31.0295 19.8164 30.2581 19.3186L30.1824 19.2697L30.232 28.6127C30.2382 29.7794 29.229 30.7306 27.9777 30.7372L22.3139 30.7673L22.2634 21.2613L17.7323 21.2854L17.7828 30.7914L12.119 30.8215C10.8678 30.8282 9.84845 29.8878 9.84224 28.7211L9.79264 19.3899L9.73567 19.4276C8.96963 19.9335 7.90921 19.765 7.36715 19.0511C6.82508 18.3372 7.00665 17.3483 7.77269 16.8423L18.8689 9.51317ZM10.9215 18.6443L10.975 28.7151C10.9781 29.2984 11.4878 29.7686 12.1134 29.7653L16.6445 29.7412L16.5995 21.2914C16.5964 20.7081 17.1011 20.2325 17.7267 20.2291L22.2578 20.2051C22.8834 20.2017 23.393 20.6719 23.3961 21.2553L23.4411 29.7051L27.9721 29.681C28.5977 29.6777 29.1024 29.2021 29.0993 28.6187L29.0457 18.5361L19.9612 12.6736L10.9215 18.6443Z"
          fill="white"
        />
      </svg>
    </Link>
    <Link to="find">
      <svg
        on:click={() => menuBtn("find")}
        pointer
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.2966 21.8979C27.018 19.429 27.7521 15.3087 25.8435 11.9917C23.6471 8.17458 18.7826 6.86672 14.9783 9.07056C11.174 11.2744 9.87054 16.1554 12.0669 19.9726C14.0327 23.3889 18.1357 24.7953 21.703 23.473L26.1718 31.2394C26.5903 31.9667 27.5171 32.2159 28.242 31.796C28.9669 31.3761 29.2152 30.4461 28.7967 29.7188L24.2966 21.8979ZM24.9685 12.4986C26.8859 15.8309 25.7481 20.0919 22.427 22.0158C19.106 23.9397 14.8593 22.798 12.9419 19.4657C11.0245 16.1334 12.1624 11.8724 15.4834 9.9485C18.8045 8.0246 23.0511 9.16633 24.9685 12.4986Z"
          fill="white"
        />
      </svg>
    </Link>
    <Link to="more">
      <svg
        on:click={() => menuBtn("more")}
        pointer
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.0001 31.5002C26.3514 31.5002 31.5002 26.3514 31.5002 20.0001C31.5002 13.6488 26.3514 8.5 20.0001 8.5C13.6488 8.5 8.5 13.6488 8.5 20.0001C8.5 26.3514 13.6488 31.5002 20.0001 31.5002Z"
          stroke="white"
        />
        <circle cx="14.4994" cy="17.2503" r="1.83335" fill="white" />
        <circle cx="20.4222" cy="17.2503" r="1.83335" fill="white" />
        <circle cx="20.4222" cy="23.1471" r="1.83335" fill="white" />
        <circle cx="26.3451" cy="17.2503" r="1.83335" fill="white" />
        <circle cx="26.3451" cy="23.1993" r="1.83335" fill="white" />
        <circle cx="14.4994" cy="23.1471" r="1.83335" fill="white" />
      </svg>
    </Link>
    <Link to={authUser ? "u/" + authUser.displayName : "login"}>
      <svg
        on:click={() => menuBtn("me")}
        pointer
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.3389 29.0902C10.3389 24.5576 14.0132 20.8833 18.5458 20.8833H21.2546C25.7871 20.8833 29.4615 24.5576 29.4615 29.0902C29.4615 30.4169 28.3859 31.4925 27.0592 31.4925H12.7412C11.4144 31.4925 10.3389 30.4169 10.3389 29.0902Z"
          stroke="white"
        />
        <rect
          x="15.9824"
          y="9.5"
          width="7.83523"
          height="7.83523"
          rx="3.91762"
          stroke="white"
          stroke-width="3"
        />
      </svg>
    </Link>
  </section>
</Router>

<Router>
    <Route path="/"   > <Home   {authUser} {posts}/></Route>
    <Route path="find"> <Find   {authUser} {users}/></Route>
    <Route path="add" > <Add    {authUser}/></Route>
    <Route path="more"> <More   {authUser}/></Route>
    <Route path="edit"> <Edit   {authUser}/></Route>
    <Route path="test"> <Test   {authUser}/></Route>
    <Route path="test2"> <Test2 {authUser}/></Route>
    <Route path="login"> <Login {authUser}/></Route>
    <Route path="about"> <About {authUser}/></Route>
    <Route path="settings"> <Settings {authUser}/></Route>
    <Route path="p/:id"   let:params> <Posts {authUser} {params}/></Route>
    <Route path="u/:name" let:params> <User  {authUser} {params}/></Route>
    <Route component={Nf} />
  </Router>

  <Router>
    <footer>
      <Link to="/">
        <svg
          on:click={() => menuBtn("home")}
          pointer
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.8689 9.51317C19.1949 9.29789 19.5741 9.20472 19.944 9.22371C20.313 9.20126 20.6924 9.29045 21.02 9.50185L32.1935 16.7126C32.9649 17.2104 33.157 18.1973 32.6225 18.9169C32.0881 19.6366 31.0295 19.8164 30.2581 19.3186L30.1824 19.2697L30.232 28.6127C30.2382 29.7794 29.229 30.7306 27.9777 30.7372L22.3139 30.7673L22.2634 21.2613L17.7323 21.2854L17.7828 30.7914L12.119 30.8215C10.8678 30.8282 9.84845 29.8878 9.84224 28.7211L9.79264 19.3899L9.73567 19.4276C8.96963 19.9335 7.90921 19.765 7.36715 19.0511C6.82508 18.3372 7.00665 17.3483 7.77269 16.8423L18.8689 9.51317ZM10.9215 18.6443L10.975 28.7151C10.9781 29.2984 11.4878 29.7686 12.1134 29.7653L16.6445 29.7412L16.5995 21.2914C16.5964 20.7081 17.1011 20.2325 17.7267 20.2291L22.2578 20.2051C22.8834 20.2017 23.393 20.6719 23.3961 21.2553L23.4411 29.7051L27.9721 29.681C28.5977 29.6777 29.1024 29.2021 29.0993 28.6187L29.0457 18.5361L19.9612 12.6736L10.9215 18.6443Z"
            fill="white"
          />
        </svg>
      </Link>
      <Link to="find">
        <svg
          on:click={() => menuBtn("find")}
          pointer
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.2966 21.8979C27.018 19.429 27.7521 15.3087 25.8435 11.9917C23.6471 8.17458 18.7826 6.86672 14.9783 9.07056C11.174 11.2744 9.87054 16.1554 12.0669 19.9726C14.0327 23.3889 18.1357 24.7953 21.703 23.473L26.1718 31.2394C26.5903 31.9667 27.5171 32.2159 28.242 31.796C28.9669 31.3761 29.2152 30.4461 28.7967 29.7188L24.2966 21.8979ZM24.9685 12.4986C26.8859 15.8309 25.7481 20.0919 22.427 22.0158C19.106 23.9397 14.8593 22.798 12.9419 19.4657C11.0245 16.1334 12.1624 11.8724 15.4834 9.9485C18.8045 8.0246 23.0511 9.16633 24.9685 12.4986Z"
            fill="white"
          />
        </svg>
      </Link>
      <Link to={authUser ? "add" : "login"}>
        <svg
          on:click={() => menuBtn("add")}
          pointer
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="10" fill="#FFA500" />
          <path
            d="M20 11C19.1716 11 18.5 11.6716 18.5 12.5V18H13C12.1716 18 11.5 18.6716 11.5 19.5C11.5 20.3284 12.1716 21 13 21H18.5V26.5C18.5 27.3284 19.1716 28 20 28C20.8284 28 21.5 27.3284 21.5 26.5V21H27C27.8284 21 28.5 20.3284 28.5 19.5C28.5 18.6716 27.8284 18 27 18H21.5V12.5C21.5 11.6716 20.8284 11 20 11Z"
            fill="#111111"
          />
        </svg>
      </Link>
      <Link to="more">
        <svg
          on:click={() => menuBtn("more")}
          pointer
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.0001 31.5002C26.3514 31.5002 31.5002 26.3514 31.5002 20.0001C31.5002 13.6488 26.3514 8.5 20.0001 8.5C13.6488 8.5 8.5 13.6488 8.5 20.0001C8.5 26.3514 13.6488 31.5002 20.0001 31.5002Z"
            stroke="white"
          />
          <circle cx="14.4994" cy="17.2503" r="1.83335" fill="white" />
          <circle cx="20.4222" cy="17.2503" r="1.83335" fill="white" />
          <circle cx="20.4222" cy="23.1471" r="1.83335" fill="white" />
          <circle cx="26.3451" cy="17.2503" r="1.83335" fill="white" />
          <circle cx="26.3451" cy="23.1993" r="1.83335" fill="white" />
          <circle cx="14.4994" cy="23.1471" r="1.83335" fill="white" />
        </svg>
      </Link>
      <Link to={authUser ? "u/" + authUser.displayName : "login"}>
        <svg
          on:click={() => menuBtn("me")}
          pointer
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3389 29.0902C10.3389 24.5576 14.0132 20.8833 18.5458 20.8833H21.2546C25.7871 20.8833 29.4615 24.5576 29.4615 29.0902C29.4615 30.4169 28.3859 31.4925 27.0592 31.4925H12.7412C11.4144 31.4925 10.3389 30.4169 10.3389 29.0902Z"
            stroke="white"
          />
          <rect
            x="15.9824"
            y="9.5"
            width="7.83523"
            height="7.83523"
            rx="3.91762"
            stroke="white"
            stroke-width="3"
          />
        </svg>
      </Link>
    </footer>
  </Router>

{:else}
  <Loading />
{/if}

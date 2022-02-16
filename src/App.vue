<template>
  <router-view />
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.btn-primary {
  background-color: #374785 !important;
}

.bg-primary {
  background-color: #374785 !important;
}

input[type='radio']:checked {
  background-color: #374785 !important;
}

input[type='checkbox']:checked {
  background-color: #374785 !important;
}

.btn {
  border-radius: 0;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

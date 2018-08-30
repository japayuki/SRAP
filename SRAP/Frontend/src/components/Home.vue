<template>
<div>
  <div class="home">

  </div>
      <div class="ptext">
        <span class="border">
            Welcome to the SRAP-MPC Management System 
        </span>
    </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Home'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  background-size: cover;
  background-image: url('../assets/home.jpg');
  height: 90vh;
  opacity: 0.4;
  
}
.ptext  {
    position: absolute;
    top: 55%;
    width: 100%;
    text-align: center;
    color: #333;
    font-size: 30px;
    letter-spacing: 8px;
    text-transform: uppercase;
    font-weight: 400;
    opacity: 0.8;

}
.ptext .border {
    background-color: #111;
    color: #fff;
    padding: 20px;
}

</style>

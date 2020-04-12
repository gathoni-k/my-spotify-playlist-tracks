<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Tracks

            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <div id="tracks" v-bind:key="track.id" v-for="track in tracks" >
                {{track.name}} by {{track.artists}}
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            Happy listening...

            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              Close me!
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    props: ['tracks'],
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #000;  
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    overflow-y:auto;
    display: flex;
    flex-direction: column;
    color: #D1913C;
    font-size: small;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #D1913C;
    color: #fff;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #D1913C;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #000;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
</style>

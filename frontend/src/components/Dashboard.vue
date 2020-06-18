<template>
    <b-card-group deck>
            <b-card  class="mb-2 box todolist-card" v-for="todolist in todolists" :key="todolist.id" >
                <!-- Header -->
                <template v-slot:header >
                    <b-form v-if="todolistRename" @submit="loginSubmit">
                        <b-row>
                            <input 
                                    type="text"
                                    class="form-control"
                                    v-model="todolist.title"
                            />
                            <b-button type="submit" variant="success" text="+" />
                        </b-row>
                    </b-form>
                    <strong v-else style="color: #fafafa;" @click="updateTodolist"
                        v-text="todolist.title" />
                    
                </template>
                    <b-list-group-item class="todoitem-item" v-for="item in todolist.items" :key="item.id">
                        <b-row>
                            <b-col cols="1">
                                <!-- Where to click to check the item -->
                                <font-awesome-icon size="lg" style="color: #329932 ;" @click="checkOrUncheck(item._id)" v-if="item.done" :icon="['fas', 'check-circle']" />
                                <font-awesome-icon size="lg" @click="checkOrUncheck(item._id)" v-else :icon="['far', 'circle']" />
                            </b-col>
                            <!-- name of the item -->
                            <b-col ><span > {{ item.name }} </span></b-col>
                        </b-row>
                    </b-list-group-item>
            </b-card>
    </b-card-group>
</template>
<script>
export default {
    methods: {
        async getTodolists () {

            // Request to get todolists. see more: https://github.com/bricefriha/TodoKernel#get-all-your-todolists-
            this.$http.get("/todolists/", {headers: {
                    Authorization: 'Bearer ' + this.$store.state.user.token //the token is a variable which holds the token
                    }})
                    .then(response => {
                        this.todolists = response.data;

                        // Add a flag to if an element is about to be added
                        this.todolists.foreach()
                    })
                    .catch();

        },
        // Check or uncheck an item as done
        async checkOrUncheck ( itemId) {
            // Request to check a todoitem. see more: https://github.com/bricefriha/TodoKernel#check-or-uncheck-a-todolist-item-
             this.$http.put("/todos/Check/" + itemId,null, {headers: {
                    Authorization: 'Bearer ' + this.$store.state.user.token
                    }})
                    .then(() => {
                        this.todolistRename = false;
                        this.getTodolists();
                    })
                    .catch();
        },
        // rename a todolist
        async renameTodolist (items, itemId) {
            // Request to check a todoitem. see more: https://github.com/bricefriha/TodoKernel#check-or-uncheck-a-todolist-item-
             this.$http.put("/todolists/rename/" + itemId,null, {headers: {
                    Authorization: 'Bearer ' + this.$store.state.user.token
                    }})
                    .then(() => {
                        this.getTodolists();
                    })
                    .catch();
        },
        updateTodolist () {
            this.todolistRename = false;
        }
    },
    data() {
      return {
          todolists: {},
          todolistRename: false,
      }
    },
    created: function() {
        this.getTodolists();
    }
}
</script>
<style scoped>
    .todolist-card{
        max-width: 400px;
        background-color: #fff ;
        border-radius: 12px;
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19);
    }
    .todolist-deck{
        display: flex;
        flex-flow: row wrap;
        margin-right: -15px;
        margin-left: -15px;
    }
    .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.todoitem-item {
    margin-top: 5px;
    margin-left: -10px;
    margin-right: -10px;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
}
.card-header {
    background-color: #005AFF ;
}
</style>
<template>
    <div >
    <b-row>
        <b-button  class="dashboard-button"  @click="addTodolistSubmit()">
            <b-row>
                <b-col cols="2">
                    <font-awesome-icon  size="sm" :icon="['fas', 'plus']" />
                </b-col>
                <b-col >
                    <strong style=" color:#fff">Add a new todolist</strong>
                </b-col>
                
            </b-row>
        </b-button>
    </b-row>
     <b-row >
    <b-card-group deck style=" margin: 20px;" >
            <b-card  class="mb-2 box todolist-card" v-for="todolist in todolists" :key="todolist.id" >
                <!-- Header -->
                <template v-slot:header >
                    <strong  style="color: #fafafa;">
                         <b-row>
                            <b-col cols="1">
                                <b-dropdown size="sm"  variant="link" toggle-class="text-decoration-none" no-caret>
                                    <template v-slot:button-content>
                                        <font-awesome-icon size="lg" style="color: #fff" :icon="['fas', 'ellipsis-h']" />
                                    </template>
                                    <b-dropdown-item @click="deleteTodolist(todolist._id)" >Delete this todolist 🗑</b-dropdown-item>
                                </b-dropdown>
                            </b-col>
                            <b-col >
                                <ClickToEdit v-model="todolist.title" :value="todolist.title" @action="renameTodolist ( todolist._id, todolist.title)"  />
                            </b-col>
                         </b-row>
                    </strong>
                    
                </template>
                <b-card-body style="margin:-20px; position:relative; height:300px; overflow-y:scroll;">

                    <b-list-group-item class="todoitem-item"  v-for="item in todolist.items" :key="item.id">
                        <b-row>
                            <b-col cols="1">
                                <!-- Where to click to check the item -->
                                <font-awesome-icon size="lg" style="color: #329932 ;" @click="checkOrUncheck(item._id)" v-if="item.done" :icon="['fas', 'check-circle']" />
                                <font-awesome-icon size="lg" @click="checkOrUncheck(item._id)" v-else :icon="['far', 'circle']" />
                            </b-col>
                            <!-- name of the item -->
                            <b-col cols="8"><ClickToEdit v-model="item.name" :value="item.name" @action="renameItem(item._id,item.name)"  /></b-col>
                            <!-- more -->
                            <b-col >
                                <b-dropdown size="sm"  variant="link" toggle-class="text-decoration-none" no-caret>
                                    <template v-slot:button-content>
                                        <font-awesome-icon size="sm" :icon="['fas', 'ellipsis-h']" />
                                    </template>
                                    <b-dropdown-item @click="removeItem(item._id)" >Remove</b-dropdown-item>
                                </b-dropdown>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-card-body>
                <template v-slot:footer  >
                    <strong style="margin-left: -100px;">Add a new task:</strong>
                        <b-input-group >
                            <!-- task name field -->
                            <b-form-input v-model="todolist.itemInputVal " :key="todolist._id" @keyup.enter="addItemSubmit(todolist.itemInputVal,todolist)"></b-form-input>
                            <!-- button -->
                            <b-input-group-append>
                                <b-button  style="background-color: #005AFF ;"  @click="addItemSubmit(todolist.itemInputVal,todolist)">
                                    <font-awesome-icon size="sm" :icon="['fas', 'plus']" />
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                </template>
            </b-card>
            
    </b-card-group>
    </b-row>
    </div>
</template>
<script>
import ClickToEdit from './ClickToEdit.vue';
export default {
    components: {
        ClickToEdit
    },
    methods: {
        async getTodolists () {

            // Request to get todolists. see more: https://github.com/bricefriha/TodoKernel#get-all-your-todolists-
            this.$http.get("/todolists/", {headers: {
                    Authorization: 'Bearer ' + this.$store.getters.user.token //the token is a variable which holds the token
                    }})
                    .then(response => {
                        this.todolists = response.data;

                        // Add extra options
                        Array.prototype.forEach.call(this.todolists, todolist =>{
                            // Add a flag to if an element is about to be added
                            todolist['isAddingItem'] = false;
                        })
                    })
                    .catch();

        },
        // Check or uncheck an item as done
        async checkOrUncheck ( itemId) {
            // Request to check a todoitem. see more: https://github.com/bricefriha/TodoKernel#check-or-uncheck-a-todolist-item-
             this.$http.put("/todos/Check/" + itemId,null, {headers: {
                    Authorization: 'Bearer ' + this.$store.getters.user.token
                    }})
                    .then(() => {
                        this.todolistRename = false;
                        this.getTodolists();
                    })
                    .catch();
        },
        // rename a todolist
        async renameTodolist ( itemId, newName) {
            const todolistInfo = {
                title: newName,

                }
            // Request to check a todoitem. see more: https://github.com/bricefriha/TodoKernel#check-or-uncheck-a-todolist-item-
             this.$http.put("/todolists/rename/" + itemId,todolistInfo, {headers: {
                    Authorization: 'Bearer ' + this.$store.getters.user.token
                    }})
                    .then(() => {
                        //this.getTodolists();
                    })
                    .catch();
        },
        updateTodolist () {
            this.todolistRename = false;
        },
        // add a new item
        async addItemSubmit(itemInputVal,todolist) {
            
            if (itemInputVal) {
                const itemInfo = {
                name: itemInputVal,
                todolistId: todolist._id,

                }
            // Request to add an item to a todolist. see more: https://github.com/bricefriha/TodoKernel/blob/master/README.md#add-an-item-to-a-todolist-
            this.$http.post("/todos/add",itemInfo, {headers: {
                    Authorization: 'Bearer ' + this.$store.getters.user.token //the token is a variable which holds the token
                    }})
                    .then(() => {
                        this.getTodolists();
                    })
                    .catch(err => console.log(err));
            }
            this.itemInputVal = '';
            
        },
        async removeItem (itemId) {
            // Request to add an item to a todolist. see more: https://github.com/bricefriha/TodoKernel/blob/master/README.md#add-an-item-to-a-todolist-
            this.$http.delete("/todos/" + itemId, {headers: {
                    Authorization: 'Bearer ' + this.$store.getters.user.token //the token is a variable which holds the token
                    }})
                    .then(() => {
                        this.getTodolists();
                    })
                    .catch(err => console.log(err));
            },
        
        async deleteTodolist (itemId) {
            // Request to add an item to a todolist. see more: https://github.com/bricefriha/TodoKernel/blob/master/README.md#add-an-item-to-a-todolist-
            this.$http.delete("/todolists/" + itemId, {headers: {
                    Authorization: 'Bearer ' + this.$store.getters.user.token //the token is a variable which holds the token
                    }})
                    .then(() => {
                        this.getTodolists();
                    })
                    .catch(err => console.log(err));
            },
        // Method to rename a task
        async renameItem (itemId, newName) {
            const itemInfo = {
                name: newName,

                }
            // Request to rename a todoitem. see more: https://github.com/bricefriha/TodoKernel#check-or-uncheck-a-todolist-item-
             this.$http.put("/todos/rename/" + itemId,itemInfo, {headers: {
                    Authorization: 'Bearer ' + this.$store.getters.user.token
                    }})
                    .then(() => {
                        this.getTodolists();
                    })
                    .catch();
        },
        // Method to rename a todolist
        async addTodolistSubmit (todolistTitle) {
            const todolistInfo = {
                title: todolistTitle,

                }
            // Request to create a todolist. see more: https://github.com/bricefriha/TodoKernel/blob/master/README.md#create-a-todolist-
             this.$http.post("/todolists/create/", todolistInfo, {headers: {
                    Authorization: 'Bearer ' + this.$store.getters.user.token
                    }})
                    .then(() => {
                        this.getTodolists();
                    })
                    .catch();
        },
        },
    data() {
      return {
          todolists: {},
          todolistRename: false,
          todolistTitle: '',
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
        min-width: 400px;
        background-color: #fff ;
        border-radius: 12px;
        
        margin: 10px;
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
        
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
    margin-top: 10px;
    margin-left: -10px;
    margin-right: -10px;
    padding-top: 10px !important;
    padding-bottom: 2px !important;
    border-radius: 8px !important;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
}
.card-header {
    border-radius: 12px 12px 0px 0px !important;
    background-color: #005AFF ;
}
.dashboard-button {
    border-radius: 8px;
    padding: auto;
    padding-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
    background-color: #005AFF ;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
}
</style>
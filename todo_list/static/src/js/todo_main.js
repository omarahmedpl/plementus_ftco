/** @odoo-module */
import {registry} from '@web/core/registry';
import {Component, WillStart, useState, EventBus, onWillDestroy, useExternalListener} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import {TodoList} from "./todo_list";

export class TodoListMain extends Component {

    setup() {
        this.bus = new EventBus();
        this.env.bus.addEventListener("ADDTODO", this.onAddTodo.bind(this));
        this.env.bus.addEventListener("REMOVETODO", this.onDeleteTodo.bind(this));
        this.env.bus.addEventListener("UPDATETODO", this.onUpdateTodo.bind(this));
        this.env.bus.addEventListener("UPDATEORDER", this.onUpdateOrder.bind(this));
        this.state = useState({
            input: "",
            todos: []
        })
        onWillDestroy(() => {
            this.env.bus.removeEventListener("ADDTODO", this.onAddTodo.bind(this));
            this.env.bus.removeEventListener("REMOVETODO", this.onDeleteTodo.bind(this));
            this.env.bus.removeEventListener("UPDATETODO", this.onUpdateTodo.bind(this));
            this.env.bus.addEventListener("UPDATEORDER", this.onUpdateOrder.bind(this));
        })
    }

    onAddTodo(ev) {
        if (ev.key === "Enter") {
            const number = this.state.todos[this.state.todos.length - 1]?.number + 1 || 1
            console.log(number)
            ev.preventDefault();
            this.state.todos.push({
                id: this.state.todos.length + 1,
                text: this.state.input,
                done: false,
                number
            });
            this.state.input = ""
        }

    }

    onDeleteTodo(ev) {
        ev.preventDefault();
        this.state.todos = this.state.todos.filter(
            (todo) => todo.id !== ev.detail.id
        );
    }

    onUpdateTodo(ev) {
        ev.preventDefault();
        this.state.todos = this.state.todos.map(
            (todo) => {
                if (todo.id === ev.detail.id) {
                    todo.done = !todo.done
                }
                return todo
            }
        );
    }

    onUpdateOrder(ev) {
        ev.preventDefault();
        this.state.todos = this.state.todos.map(
            (todo) => {
                if (todo.id === ev.detail.id) {
                    todo.number = ev.detail.newNumber
                }
                return todo
            }
        );
        this.state.todos = this.state.todos.sort((a, b) => a.number - b.number);
    }
}

TodoListMain.components = {TodoList}
TodoListMain.template = "todo_list.TodoListMain";
registry.category("actions").add("todo_list_sample.todo_list_sample", TodoListMain);
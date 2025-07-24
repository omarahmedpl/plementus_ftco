/** @odoo-module */
import {registry} from '@web/core/registry';
import {Component, WillStart, useState, useExternalListener, EventBus} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";

export class TodoItem extends Component {
    static props = ['todo']

    setup() {
        this.bus = new EventBus()
        this.state = useState({
            newNumber: this.props.todo.number
        })
    }

    onUpdateState() {
        this.env.bus.trigger('UPDATETODO', this.props.todo)
    }

    onRemoveTodo() {
        this.env.bus.trigger('REMOVETODO', this.props.todo)
    }

    onUpdateOrder(ev) {
        if (ev.key === "Enter") {
            this.env.bus.trigger('UPDATEORDER', {...this.props.todo, newNumber: this.state.newNumber})
        }
    }
}

TodoItem.components = {}
TodoItem.template = "todo_list.TodoItem";

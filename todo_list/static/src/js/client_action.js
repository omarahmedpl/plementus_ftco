/** @odoo-module */
import { registry } from '@web/core/registry';
import { Component, WillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class TodoListSample extends Component {
setup() {
    }
}
TodoListSample.template = "todo_list_sample.TodoListSample";
registry.category("actions").add("todo_list_sample.todo_list_sample", TodoListSample);
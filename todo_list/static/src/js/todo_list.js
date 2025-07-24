/** @odoo-module */
import {registry} from '@web/core/registry';
import {Component, WillStart, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import {TodoItem} from "./todo_item";

export class TodoList extends Component {
    static props = ['todos']

    setup() {

    }
}

TodoList.components = {TodoItem}
TodoList.template = "todo_list.TodoList";

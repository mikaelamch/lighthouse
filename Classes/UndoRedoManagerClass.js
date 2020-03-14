class UndoRedoManagerClass {
    constructor() {
        this.doneOperations = [];
        this.undoneOperations = [];
    }

    /**
     * Add a newly performed operation to the array of the operations done
     * @param {Object} operation the operation done
     */
    _do(operation) {
        this.doneOperations.push(operation);
    }

    /**
     * Undo the last operation performed by popping it our of the doneOperations array and pushing it in the undoneOperation's one
     */
    _undo() {
        // Undo the last operation performed
        let undoneOp = this.undoneOperations.pop();
        this.undoneOperations.push(undoneOp);
    }

}

export default UndoRedoManagerClass;
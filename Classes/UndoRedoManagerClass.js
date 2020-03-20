/**
 * This is a general class that manages undo and redo of operations
 * @file UndoRedoManagerClass.js
 * @author Alessandra
 */
class UndoRedoManagerClass {
    constructor() {
        this.doneOperations = [];
        this.undoneOperations = [];
    }

    /**
     * Add a newly performed operation to the array of the operations done
     * @param {Object} operation the operation done
     */
    do(operation) {
        if(this.doneOperations.length > 0) {
            this.doneOperations.push(operation);
        }     
        else {
            this.doneOperations = [];
            this.undoneOperations = [];
            this.doneOperations.push(operation);
        }
    }

    /**
     * Undo the last operation performed by popping it our of the doneOperations array and pushing it in the undoneOperation's one
     */
    undo() {
        // Undo the last operation performed
        let toUndoOp = this.doneOperations.pop();
        this.undoneOperations.push(toUndoOp);
    }

    /**
     * Redo last operation that was undone by popping the last added item to the undoneOperations array and pushing it in the doneOperation's one
     */
    redo() {
        // Redo the last operation undone
        let toRedoOp = this.undoneOperations.pop();
        this.doneOperations.push(toRedoOp);
    }

    // Getters
    _getLastOpInUndo() {
        return this.undoneOperations[this.undoneOperations.length - 1];
    }

    _getLastOpInDone() {
        return this.doneOperations[this.doneOperations.length - 1];
    }

    _getDoneOpArray() {
        return this.doneOperations;
    }

    _getUndoneOpArray() {
        return this.undoneOperations;
    }

}

export default UndoRedoManagerClass;
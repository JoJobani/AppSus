import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
var gFilterBy = { txt: '' }
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')

                notes = notes.filter(note => {
                    switch (note.type) {
                        case 'NoteTxt':
                            return regex.test(note.info.txt)
                        case 'NoteImg':
                            return regex.test(note.info.title)
                        case 'NoteTodo':
                            return regex.test(note.info.title) ||
                                note.info.todos.some(todo => regex.test(todo.txt))
                        case 'NoteVideo':
                            return regex.test(note.info.url)
                        default:
                            return false
                    }
                })
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type = 'NoteTxt', isPinned = false, backgroundColor = '') {
    return {
        id: '',
        createdAt: '',
        type,
        isPinned,
        style: {
            backgroundColor
        },
        info: {
            txt: ''
        },
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    return gFilterBy
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        for (let i = 0; i < 8; i++) {
            let note = _createTxtNote(utilService.getRandomColor())
            notes.push(note)
        }
        notes.push(_createImgNote(utilService.getRandomColor()))
        notes.push(_createVideoNote(utilService.getRandomColor()))
        notes.push(_createTodoNote(utilService.getRandomColor()))
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createTxtNote(bcg) {
    const note = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: Math.random() > 0.8,
        style: {
            backgroundColor: bcg
        },
        info: {
            txt: utilService.makeLorem(10)
        }
    }
    return note
}

function _createImgNote(bcg) {
    const note = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: Math.random() > 0.8,
        style: {
            backgroundColor: bcg
        },
        info: {
            url: 'https://picsum.photos/200',
            title: 'An image'
        }
    }
    return note
}

function _createVideoNote(bcg) {
    const note = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteVideo',
        isPinned: Math.random() > 0.8,
        style: {
            backgroundColor: bcg
        },
        info: {
            url: 'https://www.youtube.com/watch?v=QuvqzlxEO6g'
        }
    }
    return note
}

function _createTodoNote(bcg) {
    const note = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTodo',
        isPinned: Math.random() > 0.8,
        style: {
            backgroundColor: bcg
        },
        info: {
            title: 'A list',
            todos: [
                { txt: 'a list item', doneAt: null },
                { txt: 'another list item', doneAT: 187111111 }
            ]
        }
    }
    return note
}
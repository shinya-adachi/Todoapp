/** Vue アプリの生成 **/
function createApp() {
  new Vue({
    el: "#wrapper",
    data: {
      filter: "inbox",
      text: "",
      sortIndex: event.currentTarget.value,
      todos: [
        {
          id: 1,//認識ID
          text: "みかんを買う",//テキスト
          createdAt: 1567940003455, //登録日のUnixタイムスタンプ(ミリ秒)
          done: false, //タスクが完了したかどうか
          isEditing: false, //編集中かどうか
          display: true, //表示・非表示
          priority: 1 //優先度
        },
        {
          id: 2,
          text: "郵便物を出す",
          createdAt: 1568940003455,
          done: false,
          isEditing: false,
          display: true,
          priority: 3
        },
        {
          id: 3,
          text: "2km 走る",
          createdAt: 1567940003455,
          done: true,
          isEditing: false,
          display: true,
          priority: 3
        }
      ]
    },
    computed: {
      todoLength: function(){
        return this.todos.length
      },
      filteredTodos: function(){
        //フィルタリング
        const filter = this.filter
        return this.todos.filter(function(todo){  //filter関数をを用いてフィルタリング
          return filter === "completed" ? todo.done : !todo.done  //オブジェクトのfilterのステータスを確認し条件分岐
        })
      },
      disabled: function(){
        return this.text === ""
      }
    },
    methods: {
      formatDate: function(timestamp) {
        //引数のtimestampからDateオブジェクトを生成
        const date = new Date(timestamp)

        //dateから年、月、日を取得
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        //「年.月.日」の形式で日付を返す
        return year + "." + month + "." + day
      },
      setFilter: function(filter) {
        this.filter = filter
      },
      toggleTodo: function(id) {
        this.todos = this.todos.map(function(todo){
          //引数のidを持つtodoのdoneを逆にする
          if (todo.id === id) {
            todo.done = !todo.done
          }
          return todo
        })
      },
      handleInput: function(event) {
        this.text = event.target.value
      },
      handleSubmit: function(event) {
        event.preventDefault()
        //テキストフィールドの内容をもとにTodoを追加する
        this.addTodo(this.text)
        //テキストフィールドを空にする
        this.text = ""
        this.handleSort()
      },
      addTodo: function(text){
        //Todoを追加する処理
        this.todos.push({
          id: this.todos.length + 1,
          text: text,
          createdAt: Date.now(),
          done: false,
          isEditing: false,
          display: true,
          priority: 3
        })
      },
      editTodo: function(id){
        this.todos = this.todos.map(function(todo){
          //引数のidを持つtodoを編集中にする
          if(todo.id === id) {
            todo.isEditing = true
          }
          return todo
        })
      },
      saveTodo: function(id) {
        this.handleSort()
        this.todos = this.todos.map(function(todo) {
          //引数のidをもつtodoの編集を終了する
          if (todo.id === id){
            todo.isEditing = false
          }
          return todo
        })
      },
      deleteTodo: function (id) {
        this.todos = this.todos.map(function(todo){
          //引数のidを持つtodoを非表示にする
          if(todo.id === id) {
            todo.display = false
          }
          return todo
        })
      },
      //ソート関数 
      sortTodos: function (a, b) {
       switch (this.sortIndex) {
          case "created-desc":
           return b.createdAt - a.createdAt
          case "created-asc":
            return a.createdAt - b.createdAt
          case "priority-desc":
            return b.priority - a.priority
          case "priority-asc":
            return a.priority - b.priority
          default:
            return this.todos
        }
      },
      //ソート実行
      handleSort: function () {
        //HTMLのステータスを取得
        sortMenu = document.querySelector("#sort-menu")
        this.sortIndex = sortMenu.value
        //this.sortIndex = event.currentTarget.value
        this.todos.sort(this.sortTodos)
      }
    }
  })
}

/** 初期化 **/
function initialize() {
  createApp()
}

document.addEventListener("DOMContentLoaded", initialize.bind(this))

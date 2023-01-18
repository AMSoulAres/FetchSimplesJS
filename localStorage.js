class Storage {
    static add(list) {
      localStorage.setItem("@cardapio", JSON.stringify(list));
    }
    static update(list) {
      Storage.add(list);
    }
  
    static getList() {
      const lista = localStorage.getItem("@cardapio");
  
      if (lista) {
        return JSON.parse(lista);
      }
      return undefined;
    }

    static remove(list, item){
      list = []
      Storage.add(list);
    }
  }
  
  export default Storage;
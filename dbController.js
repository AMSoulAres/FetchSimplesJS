class Db {
  static baseUrl = "http://localhost:3000/profile";

  static async addItem(item) {
    try {
      const res = await fetch(`${Db.baseUrl}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const body = await res.json();

      console.log(item);
      return body;
    } catch (error) {
      console.log("Unexpected Error");
      console.log(error);
    }
  }

  static async update(id, item) {
    const { _id, ...rest } = item;
    try {
      const res = await fetch(`${Db.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(rest),
      });

      return await res.json();
    } catch (err) {
      console.log("Unexpected Error");
      console.log(err);
    }
  }

  static async remove(id) {
    try {
      const res = await fetch(`${Db.baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      return await res.json();
    } catch (err) {
      console.log("Unexpected Error remove");
      console.log(err);
    }
  }

  static async getOne(id) {
    try {
      const res = await fetch(`${Db.baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      return await res.json();
    } catch (err) {
      console.log("Unexpected Error");
      console.log(err);
    }
  }
  
  static async getAll() {
    try {
      const res = await fetch(`${Db.baseUrl}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      return await res.json();
    } catch (err) {
      console.log("Unexpected Error");
      console.log(err);
    }
  }
}

export default Db;

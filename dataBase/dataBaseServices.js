class DataBaseServices{

    constuctor(Database){
        this.Database=Database;
    }

    connectDataBase(){

     return this.Database.connect()
    }


    disconnectDataBase(){

       return this.Database.disconnect()
    }
}
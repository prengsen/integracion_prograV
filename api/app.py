from flask import Flask, request, jsonify
import json
#import pymysql
import peewee
import datetime

database = peewee.MySQLDatabase("myBooks", 
                                host="localhost", 
                                port=3306,
                                password="Prengsen123*",
                                user="root")
#modelo para autenticaciones
class Auth(peewee.Model):
    id = peewee.IntegerField(primary_key=True)
    password = peewee.CharField(null=False)
    username = peewee.CharField(null=False)
    lastlogin = peewee.DateTimeField(default = datetime.datetime.now, null=False)

    class Meta:
        database = database
        db_table = "Autenticaciones"

#Modelo para Logins
class Logins(peewee.Model):
    id = peewee.IntegerField(primary_key=True)
    Username = peewee.CharField(null=False)
    loginDateTime = peewee.DateTimeField(default=datetime.datetime.now, null=False)

    class Meta:
        database = database
        db_table = "Logins"


#Modelo de Libros
class Libros(peewee.Model):
    Id = peewee.IntegerField(primary_key=True)
    Nombre = peewee.CharField()
    Edicion = peewee.IntegerField()
    Descripcion = peewee.CharField()
    Portada = peewee.CharField()
    #IdAutor = 

    class Meta():
        database = database
        db_table = "Libros"

#Modelo para rentas
class Renta(peewee.Model):
    Id = peewee.IntegerField(primary_key=True)
    Username = peewee.CharField(null=False)
    FechaInicio = peewee.DateTimeField()
    FechaFinal = peewee.DateTimeField()
    Estado = peewee.CharField()
    IdLibro = peewee.ForeignKeyField(Libros, backref="Id")

    class Meta():
        database = database
        db_table = "Rentas"

app = Flask(__name__)

#------------- Rutas --------------

#performLogin
@app.route('/login_request/', methods=['POST'])
def performLogin():
    data = request.get_json()
    print(data)
    query = Auth.select().where(Auth.username==data['username'], 
                                Auth.password==data['password'])
    if(query.exists()):
        print("Login Permitido")
        print(datetime.datetime.now())
        query = (Auth
                    .update({Auth.lastlogin: datetime.datetime.now()})
                    .where(Auth.username == data['username']))
        query.execute()
        
        #insert a tabla de logins.
        new_login = (Logins.create(Username=data['username'],
                               loginDateTime = datetime.datetime.now()))
        new_login.save()
        return jsonify({'Salida':True})
    else:
        print("Usuario no Permitido")
        return jsonify({'Salida':False})

#mostrarLista de Rentas
@app.route('/get_book_list/<type>')
def getBookList(type):
    data = request.get_json()
    query = (Libros
                .select(Renta.Username.alias('usuario'), Libros.Nombre, Libros.Edicion, 
                          Libros.Descripcion, Libros.Portada)
                .join(Renta)
                .dicts())
    print(str(query))
    return 'OK'




if __name__ == '__main__':
    app.run(debug=True)


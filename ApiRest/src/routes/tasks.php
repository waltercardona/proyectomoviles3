<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

//************** */ Crud logins *********************//

// Crear usuario
$app->post('/api/users/signup', function(Request $request, Response $response){
    $names = $request->getParam('name');
    $email = $request->getParam('email');
    $password = $request->getParam('password');

    $sql = "INSERT INTO  logins (name, email, password ) VALUES
            (:names, :email, :password)"; 
    try{
        $db = new db();
        $db = $db->conecctiondb();
        $resultado = $db->prepare($sql);

        $resultado->bindParam(':names', $names);
        $resultado->bindParam(':email', $email);
        $resultado->bindParam(':password', $password);
        $resultado->execute();

        $error = false;
        if($resultado->rowCount() > 0){
            $data = array('message'=> 'User successfully created');
        }else{
            $data = array('message'=> 'there are no users in the database');
            $error = true;
        }
        
        $resultado = null;
        $db = null;
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        if(!$error)
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(200);
        }
        else
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(404);
        }
    }catch(PDOException $e){ 
        echo '{"error" : {"text":'.$e->getMessage().'}';
    }
});

// Buscar usuario por email y contraseña usuario
$app->post('/api/users/signin', function(Request $request, Response $response){
    $email = $request->getParam('email');
    $password = $request->getParam('password');
    $sql = "SELECT * FROM logins WHERE email = :email AND password = :password";
    try{
        $db = new db();
        $db = $db->conecctiondb();
        $resultado = $db->prepare($sql);
        $resultado->bindParam(':email', $email);
        $resultado->bindParam(':password', $password);
        $resultado->execute();
        $error = false;
        if($resultado->rowCount() > 0){
            $users = $resultado->fetchAll(PDO::FETCH_OBJ);
            $data = array('user'=> $users[0]);
        }else{
            $data = array('message'=> 'User not found');
            $error = true;
        }
        
        $resultado = null;
        $db = null;
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        if(!$error)
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(200);
        }
        else
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(404);
        }
        
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMassage().'}';
    }
});

// Buscar usuario por id
$app->get('/api/users/{id}', function(Request $request, Response $response){
    $userId = $request->getAttribute('id');
    $sql = "SELECT * FROM logins WHERE  _id = $userId";
    
    try{
        $db = new db();
        $db = $db->conecctiondb();
        $resultado = $db->prepare($sql);
        $resultado->execute();
        $error = false; 
        if($resultado->rowCount() > 0){
            $users = $resultado->fetchAll(PDO::FETCH_OBJ);
            $data = array('user'=> $users[0]);
        }else{
            $data = array('message'=> 'User not found');
            $error = true;
        }
        
        $resultado = null;
        $db = null;
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        if(!$error)
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(200);
        }
        else
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(404);
        }
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMassage().'}';
    }
});

// Modificar usuario
$app->put('/api/users/modificarlogin/{id}', function(Request $request, Response $response){
    $id_login = $request->getAttribute('id');
    
    $names = $request->getParam('name');
    $email = $request->getParam('email');
    $password = $request->getParam('password');
   
    $sql = "UPDATE logins SET
            name = :name,
            email = :email,
            password = :password

            WHERE  id = $id_login";
    try{
        $db = new db();
        $db = $db->conecctiondb();
        $resultado = $db->prepare($sql);

        $resultado->bindParam(':name', $names);
        $resultado->bindParam(':email',$email);
        $resultado->bindParam(':password',$password);
      
        $resultado->execute();
        
        echo json_encode("login modificado");

        $resultado = null;
        $db = null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMassage().'}';
    }
});

//************** */ Crud Citas *********************//

// Crear cita
$app->post('/api/citas/new-cita', function(Request $request, Response $response){
    $id_number = $request->getParam('id_number');
    $name = $request->getParam('name');
    $lastname = $request->getParam('lastname');
    $birth = $request->getParam('birth');
    $city  = $request->getParam('city');
    $neighborhood = $request->getParam('neighborhood');
    $phone = $request->getParam('phone');
    $userId = $request->getParam('userId');

    $sql = "SELECT * FROM citas WHERE  id_number = $id_number";
    try{
        $db = new db();
        $db = $db->conecctiondb();
        $resultado = $db->prepare($sql);
        $resultado->execute();
        $error = false; 
        if($resultado->rowCount() > 0){
            $data = array('message'=> 'The appointment already exists');
            $error = true;
        }else{
            $sql = "INSERT INTO  citas (id_number, name, lastname, birth, city, neighborhood, phone, user) VALUES
                    (:id_number, :name, :lastname, :birth, :city, :neighborhood, :phone, :user)"; 
            $resultado = $db->prepare($sql);
            $resultado->bindParam(':id_number', $id_number);
            $resultado->bindParam(':name', $name);
            $resultado->bindParam(':lastname', $lastname);
            $resultado->bindParam(':birth', $birth);
            $resultado->bindParam(':city', $city);
            $resultado->bindParam(':neighborhood', $neighborhood);
            $resultado->bindParam(':phone', $phone);
            $resultado->bindParam(':user', $userId);
            $resultado->execute();
            if($resultado->rowCount() > 0){
                $data = array('message'=> 'Quote created successfully');
            }else{
                $data = array('message'=> 'Could not create appointment');
                $error = true;
            }
        }
        
        $resultado = null;
        $db = null;
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        if(!$error)
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(200);
        }
        else
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(404);
        }
    }catch(PDOException $e){ 
        echo '{"error" : {"text":'.$e->getMessage().'}';
    }
});

// Obtener todas las citas de un usuario
$app->get('/api/citas', function(Request $request, Response $response){
    $userId = $request->getQueryParams('userId')['userId'];
    $sql = "SELECT * FROM citas WHERE  user = $userId";
    try{
        $db = new db();
        $db = $db->conecctiondb();
        $resultado = $db->query($sql);
        $error = false; 
        if($resultado->rowCount() > 0){
            $citas = $resultado->fetchAll(PDO::FETCH_OBJ);
            $data = array('citas'=> $citas);
        }else{
            $data = array('citas'=> null);
        }
        $resultado = null;
        $db = null;
        $payload = json_encode($data);
        $response->getBody()->write($payload);
    
        return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(200);
        
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMassage().'}';
    }
});

// Obtener cita por id
$app->get('/api/citas/edit', function(Request $request, Response $response){
    $userId = $request->getQueryParams()['userId'];
    $citaId = $request->getQueryParams()['citaId'];
    $sql = "SELECT * FROM citas WHERE _id = $citaId";
    try{
        $db = new db();
        $db = $db->conecctiondb();
        $resultado = $db->query($sql);
        $error = false; 
        if($resultado->rowCount() > 0){
            $cita = $resultado->fetchAll(PDO::FETCH_OBJ);
            if($cita[0]->user != $userId)
            {
                $data = array('message'=> 'You cannot edit this quote');
                $error = true;
            }
            else
            {
                $data = array('cita'=> $cita[0]);
            }
        }else{
            $error = true;
            $data = array('message'=> 'Quote not found');
        }
        $resultado = null;
        $db = null;
        $payload = json_encode($data);
        $response->getBody()->write($payload);
    
        return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(200);
        
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMassage().'}';
    }
});

// Editar una cita
$app->put('/api/citas/edit/{id}', function(Request $request, Response $response){
    $citaId = $request->getAttribute('id');
    $name = $request->getParam('name');
    $lastname = $request->getParam('lastname');
    $birth = $request->getParam('birth');
    $city  = $request->getParam('city');
    $neighborhood = $request->getParam('neighborhood');
    $phone = $request->getParam('phone');
    $userId = $request->getParam('userId');
    
    try{
        $db = new db();
        $db = $db->conecctiondb();
        $sql = "SELECT * FROM citas WHERE  _id = $citaId";
        $resultado = $db->query($sql);
        $error = false; 
        if($resultado->rowCount() > 0){
            $cita = $resultado->fetchAll(PDO::FETCH_OBJ);
            if($cita[0]->user != $userId)
            {
                $data = array('message'=> 'Unauthorized appointment');
                $error = true;
            }
            else
            {
                $sql = "UPDATE citas SET
                    name = :name,
                    lastname = :lastname,
                    birth = :birth,
                    city = :city,
                    phone = :phone,
                    neighborhood = :neighborhood
                    WHERE  _id = :citaId";

                $resultado = $db->prepare($sql);

                $resultado->bindParam(':name', $name);
                $resultado->bindParam(':lastname',$lastname);
                $resultado->bindParam(':birth',$birth);
                $resultado->bindParam(':city',$city);
                $resultado->bindParam(':neighborhood',$neighborhood);
                $resultado->bindParam(':phone',$phone);
                $resultado->bindParam(':citaId',$citaId);
                $resultado->execute();

                if($resultado->rowCount() > 0){
                    $data = array('message'=> 'Quote updated correctly');
                }
                else{
                    $data = array('message'=> 'Could not update');
                    $error = true;
                }
            }
        }
        else{
            $error = true;
            $data = array('message'=> 'Quote not found');
        }

        $resultado = null;
        $db = null;
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        if(!$error)
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(200);
        }
        else
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(404);
        }
        
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMassage().'}';
    }
});

$app->delete('/api/citas/delete/{id}', function(Request $request, Response $response){
    $citaId = $request->getAttribute('id');
    $userId = $request->getQueryParams()['userId'];
    $sql = "SELECT * FROM citas WHERE  _id = $citaId";
    
    try{
        $db = new db();
        $db = $db->conecctiondb();
        $resultado = $db->prepare($sql);
        $resultado->execute();
        $error = false; 
        if($resultado->rowCount() > 0){
            $cita = $resultado->fetchAll(PDO::FETCH_OBJ);
            if($cita[0]->user != $userId)
            {
                $data = array('message'=> 'You are not authorized to remove the appointment');
                $error = true;
            }
            else
            {
                $sql = "DELETE FROM citas WHERE  _id = $citaId";
                $resultado = $db->prepare($sql);
                $resultado->execute();
                if($resultado->rowCount() > 0){
                    $data = array('message'=> 'Appointment removed successfully');
                }else{
                    $data = array('message'=> '
                    Could not delete the appointment');
                    $error = true;
                }
                $data = array('cita'=> $cita);
            }
        }else{
            $error = true;
            $data = array('message'=> 'Quote not found');
        }
       
        $resultado = null;
        $db = null;
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        if(!$error)
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(200);
        }
        else
        {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(404);
        }
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMassage().'}';
    }
});
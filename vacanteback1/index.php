<?php 
	
	header('Content-Type: application/json'); 
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
	
	$method = $_SERVER['REQUEST_METHOD'];
	
	$params = $_REQUEST;
	$data = json_decode(file_get_contents('php://input'), true);
	
	include 'includes/db.php'; 
	
	switch ($method){
	  
	  case 'GET':
	  	
			if(isset($params['usuario']) && !empty($params['usuario'])){
				
				$stmt = $conn->prepare('SELECT `nombres`, `apellidos`, `cedula`, `correo`, `telefono` FROM usuarios WHERE id = ?');
				$stmt->bind_param('s', $params['usuario']);

				$stmt->execute();
				
				$result = $stmt->get_result()->fetch_assoc();
				$stmt->close();
				$result = isset($result) ? [$result] : [];
				
			}else if(isset($params['delete']) && !empty($params['delete'])){
				
				$stmt = $conn->prepare('DELETE FROM `usuarios` WHERE `usuarios`.`id` = ?');
				$stmt->bind_param('s', $params['delete']);

				$stmt->execute() ? ($result = ['success' => true]) : ($result = ['err' => $stmt->error]);
				$stmt->close();
				
			}else if(isset($params['checkcedula']) && !empty($params['checkcedula'])){
				
				$stmt = $conn->prepare('SELECT `id` FROM usuarios WHERE cedula = ?');
				$stmt->bind_param('s', $params['checkcedula']);

				$stmt->execute();
				
				$result = $stmt->get_result()->fetch_assoc();
				$stmt->close();
				
				$result = isset($result) ? $result : [];
			
			}else if(isset($params['checkcorreo']) && !empty($params['checkcorreo'])){
				
				$stmt = $conn->prepare('SELECT `id` FROM usuarios WHERE correo = ?');
				$stmt->bind_param('s', $params['checkcorreo']);

				$stmt->execute();
				
				$result = $stmt->get_result()->fetch_assoc();
				$stmt->close();
				$result = isset($result) ? $result : [];
				
			}else{
				
				$stmt = $conn->query('SELECT * FROM usuarios');
				
				$result = Array();
				
				while($row = $stmt->fetch_array(MYSQLI_ASSOC)){
					
					$result[$row['id']] = $row;
					
				}
				
				$stmt->close();
				
				$result = isset($result) ? $result : [];				
				
			}
		  
		  break;
	  
	  case 'POST':
	  
			if(isset($params['add'])){
				
				if(!array_diff_key(array_flip(['nombres','apellidos','nombres','cedula','correo','telefono']), $data)){
				
					$stmt = $conn->prepare("INSERT INTO usuarios(nombres, apellidos, cedula, correo, telefono) VALUES (?, ?, ?, ?, ?)");
						
					$stmt->bind_param('sssss', 
						$data['nombres'],
						$data['apellidos'],
						$data['cedula'],
						$data['correo'],
						$data['telefono']
					);
						
					$stmt->execute() ? ($result = ['id' => $stmt->insert_id]) : ($result = ['err' => $stmt->error]);
					
					$stmt->close();
					
				}
				
			}else if(isset($params['update']) && !empty($params['update'])){
							
				if(!array_diff_key(array_flip(['nombres','apellidos','nombres','cedula','correo','telefono']), $data)){
				
					$stmt = $conn->prepare("UPDATE usuarios SET nombres = ?, apellidos = ?, cedula = ?, correo = ?, telefono = ? WHERE id = ?");
					
					$data['id'] = $params['update'];
						
					$stmt->bind_param('ssssss', 
						$data['nombres'],
						$data['apellidos'],
						$data['cedula'],
						$data['correo'],
						$data['telefono'],
						$data['id']
						
					);
					
					$stmt->execute() ? ($result = ['id' => $stmt->insert_id]) : ($result = ['err' => $stmt->error]);
					
					$stmt->close();
					
				}
				
			}
		  break;
		  
	  default:
		  $result = '';
		  
	}
	
	die(json_encode($result));
	
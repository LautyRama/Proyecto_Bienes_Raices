<?php

namespace Controllers;

use MVC\Router;
use Model\Propiedad;
use PHPMailer\PHPMailer\PHPMailer;

class PaginasController {
    public static function index( Router $router ) {

        $propiedades = Propiedad::get(3);
        $inicio = true;

        $router->render('paginas/index', [
            'propiedades' => $propiedades,
            'inicio' => $inicio
        ]);
    }
    public static function nosotros( Router $router ) {
        $router->render('paginas/nosotros');
    }
    public static function propiedades( Router $router ) {

        $propiedades = Propiedad::all();

        $router->render('paginas/propiedades', [
            'propiedades'=> $propiedades
        ]);
    }
    public static function propiedad( Router $router ) {

        $id = validarORedireccionar('/propiedades');
        $propiedad = Propiedad::find($id);

        $router->render('paginas/propiedad', [
            'propiedad' => $propiedad
        ]);
    }
    public static function blog( Router $router ) {
        $router->render('paginas/blog');
    }
    public static function entrada( Router $router ) {
        $router->render('paginas/entrada');
    }
    public static function contacto( Router $router ) {

        $mensaje = null;

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
            $respuestas = $_POST['contacto'];

            $mail = new PHPmailer();

            $mail->isSMTP();
            $mail->Host = 'smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            $mail->Username = '74026cf1365af9';
            $mail->Password = 'ec73bedce13809';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 2525;

            $mail->setFrom('admin@bienesraices.com');
            $mail->addAddress('admin@bienesraices.com', 'BienesRaices.com');
            $mail->Subject = 'Tienes un Nuevo Mensaje';

            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';

            $contenido = '<html>';
            $contenido .= '<p>Tienes un nuevo mensaje</p>';
            $contenido .= '<p>Nombre:  ' . $respuestas['nombre']   . ' </p>';

            if($respuestas['contacto'] === 'telefono') {
                $contenido .= '<p>Eligio ser contactado por telefono:</p>';
                $contenido .= '<p>Telefono:  ' . $respuestas['telefono']   . ' </p>';
                $contenido .= '<p>Fecha contacto:  ' . $respuestas['fecha']   . ' </p>';
                $contenido .= '<p>Hora :  ' . $respuestas['hora']   . ' </p>';
            } else {
                $contenido .= '<p>Eligio ser contactado por email:</p>';
                $contenido .= '<p>Email:  ' . $respuestas['email']   . ' </p>';
            }

            $contenido .= '<p>Mensaje:  ' . $respuestas['mensaje']   . ' </p>';
            $contenido .= '<p>Vende o compra:  ' . $respuestas['tipo']   . ' </p>';
            $contenido .= '<p>Precio o presupuesto:  $' . $respuestas['precio']   . ' </p>';
            $contenido .= '</html>';

            $mail->Body = $contenido;
            $mail->AltBody = 'Esto es texto alternativo sin HTML';
            
            if($mail->send()) {
                $mensaje = "Mensaje enviado Correctamente";
            } else {
                $mensaje = "El mensaje no se pudo enviar";
            }
        }

        $router->render('paginas/contacto', [
            'mensaje' => $mensaje
        ]);
    }
}
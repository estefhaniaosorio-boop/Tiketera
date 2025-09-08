
import { Solicitud, TipoDocumento, EstadoSolicitud, ChartDataPoint, Contrato, EstadoContrato, Signer, SignerRole, User, Firma, Credential, CupoData } from './types';

// Fix: Moved RENTAL_CONTRACT_TEMPLATE_VIVIENDA from pages/ContractSigningPage.tsx to resolve reference error.
export const RENTAL_CONTRACT_TEMPLATE_VIVIENDA = `CONTRATO DE ARRENDAMIENTO DE INMUEBLE DESTINADO PARA VIVIENDA URBANA 2025

ARRENDADOR: _________________________ con C.C. No. _________________________
ARRENDATARIO: _________________________ con C.C. No. _________________________

CONDICIONES GENERALES

PRIMERA: OBJETO DEL CONTRATO: Mediante el presente contrato el arrendador concede al arrendatario el goce del inmueble que adelante se identifica por su dirección, de acuerdo con el inventario que las partes firman por separado y que forma parte integral de este contrato.

SEGUNDA: DIRECCION DEL INMUEBLE: _________________________ en la ciudad de _________________________; Este inmueble está identificado en la Oficina de Registro de Instrumentos Públicos de _________________________ con la Matrícula Inmobiliaria número _________________________.

TERCERA: LINDEROS DEL INMUEBLE ARRENDADO: Los linderos se relacionan en hoja anexa, que hace parte integral de este contrato. PARAGRAFO: No obstante el área y linderos, dicho inmueble se entrega como cuerpo cierto y no por cabida.

CUARTA: DESTINACION: El arrendatario se compromete a destinar este inmueble exclusivamente para vivienda y no puede darle un uso distinto.

QUINTA: PRECIO DEL ARRENDAMIENTO: $_________________________ pesos m/cte. que el Arrendatario pagará en su totalidad, mensualmente, dentro de los cinco (5) primeros días calendario de cada periodo mensual, por Anticipado, al arrendador o a su orden.

SEXTA: INCREMENTOS DEL PRECIO: Vencido el primer año de vigencia de este contrato y así sucesivamente cada doce (12) mensualidades, en caso de prórroga tácita o expresa, en forma automática y sin necesidad de requerimiento alguno entre las partes, el precio mensual del arrendamiento se incrementará en una proporción igual al 100% del incremento que haya tenido el índice de precios al consumidor en el año calendario inmediatamente anterior a aquél en que se efectúe el incremento. Al suscribir este contrato el arrendatario y los deudores solidarios quedan plenamente notificados de todos los reajustes automáticos pactados en este contrato y que han de operar durante la vigencia del mismo.

SEPTIMA: CUOTAS DE ADMINISTRACIÓN: Se obliga también el arrendatario a pagar al arrendador o a su orden la suma de $_________________________ pesos m/cte. pagaderos por concepto de cuota mensual de administración, en forma anticipada, dentro de los cinco (5) primeros días de cada mes calendario. Este valor se reajustará automáticamente en la fecha y proporción que decida la asamblea de la copropiedad. El arrendatario y los deudores solidarios renuncian expresamente a los requerimientos para constitución en mora respecto de esta obligación pecuniaria. PARAGRAFO 1: El arrendatario conoce, acepta y se obliga a cumplir el respectivo Reglamento de Propiedad Horizontal y/o Manual de Convivencia, del cual recibe una copia a la firma de este contrato. PARAGRAFO 2: Las cuotas extraordinarias de administración serán responsabilidad del Arrendador.

OCTAVA: LUGAR PARA EL PAGO: El arrendatario pagará el precio del arrendamiento y las cuotas de administración al arrendador en la CUENTA No. _________________________ del Banco _________________________ a nombre de _________________________. Para efectos de cumplimiento del pago, EL ARRENDATARIO se obliga a enviar a la dirección de notificación de EL ARRENDADOR dentro de los primeros 5 días de cada período mensual, el comprobante de pago virtual o fisico donde se evidencie la transferencia realizada por el monto indicado a la cuenta anteriormente descrita. Queda establecido que los períodos mensuales son indivisibles, y por lo tanto EL ARRENDATARIO debe pagar el canon pactado en su totalidad, cualquiera que sea el número de días que ocupe el inmueble durante el período respectivo. PARAGRAFO: SI EL ARRENDADOR ha efectuado la correspondiente reclamación a SEGUROS COMERCIALES BOLIVAR S.A., por incumplimiento del contrato, El Arrendatario o cualquiera de los deudores solidarios deberán pagar directamente en la cuenta y en los términos que le indique la Compañía Aseguradora o a su delegada.

NOVENA: VIGENCIA DEL CONTRATO: Doce (12) meses, que comienzan a contarse el día ___ de __________ de ________.

DECIMA: PRÓRROGAS: Este contrato se entenderá prorrogado en iguales condiciones y por el mismo término inicial, siempre que cada una de las partes haya cumplido con las obligaciones a su cargo y, que el arrendatario, se avenga a los reajustes de la renta pactados en la cláusula quinta que antecede, autorizados en la Ley 820 de 2003.

DÉCIMA PRIMERA: SERVICIOS: Estarán a cargo del arrendatario los servicios públicos domiciliarios: Acueducto, Aseo y Alcantarillado, Energía Eléctrica, Gas Natural y Línea Telefónica No._____________. Los servicios de carácter privado, tales como antena parabólica, televisión satelital o por cable, Internet, Banda Ancha, avisos en páginas amarillas o cualquier otro, serán responsabilidad directa y exclusiva del arrendatario sobre lo cual EL ARRENDADOR no confiere autorización ni solidaridad alguna para su instalación y costos de servicio. EL ARRENDADOR no autoriza a EL ARRENDATARIO para adquirir créditos, pólizas fúnebres, periódicos, revistas y/o periódicos, electrodomésticos y demás mediante las facturas de los servicios públicos. El presente documento, junto con los recibos cancelados por el arrendador, constituye título ejecutivo para cobrar judicialmente al arrendatario y sus garantes los servicios que dejaren de pagar siempre que tales montos correspondan al período en el que estos tuvieron en su poder el inmueble.

DÉCIMA SEGUNDA: COSAS O USOS CONEXOS: Además del inmueble identificado y descrito anteriormente, tendrá el ARRENDATARIO derecho de goce sobre los siguientes bienes y usos: _________________________ de todas las zonas comunes existentes, de acuerdo a lo estipulado en el Reglamento de Propiedad Horizontal, el cual declara conocer y se obliga a cumplir.

DÉCIMA TERCERA: CLAUSULA PENAL: El incumplimiento por parte del arrendatario o del arrendador de cualquiera de las cláusulas de este contrato, lo constituirá en deudor de la parte cumplida, en una suma equivalente a dos (2) mensualidades del arrendamiento que se encuentre vigente o en ejecución al momento del incumplimiento. El pago de la Pena no extingue la obligación principal y podrá iniciarse a la vez el cobro de la pena, de la obligación principal y de los daños y perjuicios a que hubiere lugar. Ante el incumplimiento del pago del canon de arrendamiento en los términos pactados o de cualquier obligación pecuniaria a cargo del Arrendatario, será exigible la cláusula penal aquí pactada a favor del Arrendador. Las partes renuncian expressamente a los requerimientos para ser constituidos en mora del pago de cualquiera de sus obligaciones legales y las que aquí expresamente se han acordado.

DÉCIMA QUARTA: ESPACIOS EN BLANCO: El arrendatario faculta expresamente al arrendador para llenar en documentos adjuntos a este contrato, los espacios en blanco referentes a los linderos, inventario, actualización de nomenclatura y recibo del inmueble.

DÉCIMA QUINTA: REQUERIMENTOS: El arrendatario y los deudores solidarios que suscriben este contrato renuncian expressamente a los requerimientos de que trata el artículo 2007 del Código Civil y en general a los que consagre cualquier norma sustancial o procesal para efectos de la constitución en mora.

DÉCIMA SEXTA: PREAVISOS PARA LA ENTREGA: Las partes podrán dar por terminado unilateralmente el contrato de arrendamiento a la fecha de vencimiento del término inicial o de sus prórrogas, siempre y quando dé previo aviso por escrito a través del servicio postal autorizado, con una antelação no menor a tres (3) meses a la referida fecha de vencimiento. La terminación unilateral por parte del arrendatario en cualquier otro momento solo se aceptará previo el pago de una indemnización equivalente al precio de tres (3) meses de arrendamiento que esté vigente en el momento de entrega del inmueble.

DÉCIMA SEPTIMA: CAUSALES DE TERMINACIÓN: A favor del arrendador serán las siguientes: a) La cesión o subarriendo. b) El cambio de destinación del inmueble, c) El no pago del precio del canon y de las cuotas de administración dentro del término previsto en este contrato. d) La incursión reiterada del arrendatario en procederes que afecten la tranquilidad ciudadana de los vecinos, o la destinación del inmueble para actos delictivos, o contrarios a las buenas costumbres, o que impliquen contravención, o que representen peligro para el inmueble o la salubridad de sus habitantes. e) La realización de mejoras, cambios o ampliaciones del inmueble, sin expresa autorización del arrendador. f) La no cancelación oportuna de los servicios públicos a cargo del arrendatario. g) Las demás causales previstas en la ley. h) Que el arrendatario y/o deudores solidarios aparezcan en listas vinculantes/restrictivas (ONU/OFAC) o condenas asociadas a delitos de lavados de activos A favor del arrendatario serán las siguientes: a) La suspensión de la prestación de los servicios públicos al inmueble, por acción premeditada del arrendador o porque incurra en mora en pagos que estuvieran a su cargo. En estos casos del arrendatario podrá optar por asumir el costo del restablecimiento del servicio y descontarlo de los pagos que le corresponda hacer como arrendatario. b) La incursión reiterada del arrendador en procederes que afecten gravemente el disfrute cabal por el arrendatario del inmueble arrendado, debidamente comprobada ante la autoridad policiva. c) El desconocimiento por parte del arrendador de derechos reconocidos al arrendatario por la Ley o contractualmente.

DÉCIMA OCTAVA: CESIÓN DE LOS DERECHOS: El Arrendatario no podrá ceder ni subarrendar el inmueble, ni ninguna porción del mismo sin que medie el consentimiento previo, expreso y por escrito del Arrendador. PARAGRAFO: Podrá el arrendador ceder libremente los derechos que emanan de este contrato y tal cesión producirá efeitos respecto del arrendatario y de los deudores solidarios a partir de la fecha de la comunicación certificada en que a ellos se notifique tal cesión.

DÉCIMA NOVENA: RECIBO Y ESTADO: El arrendatario declara que ha recibido el inmueble objeto de este contrato en buen estado, conforme al inventario que hace parte del mismo, y que en el mismo estado lo restituirá al arrendador a la terminación del arrendamiento, o cuando éste haya de cesar por alguna de las causales previstas, salvo el deterioro proveniente del tiempo y del uso legítimo.

VIGÉSIMA: MEJORAS: No podrá el arrendatario ejecutar en el inmueble mejoras de ninguna especie, excepto las reparaciones locativas, sin el permiso escrito del arrendador. Si se ejecutaren accederán al propietario del inmueble sin indemnización para quien las efectuó. El arrendatario renuncia expressamente a descontar de la renta el valor de las reparaciones indispensables, a que se refere o artigo 27 de la Ley 820 de 2003. PARAGRAFO: Las reparaciones locativas son aquellas que están a la vista del inmueble y en uso por el arrendatario, ejemplo: tomas, bombillos, llaves, puertas, chapas, botones de estufa, etc. (cuando se hace entrega del inmueble al arrendatario según inventario, están funcionando, pero por el uso, se dañan), están a cargo del Arrendatario por Ley y este las debe reparar con su propio gasto, no se pueden descontar del canon de arrendamiento. Las reparaciones indispensables por el contrario, sí le corresponden al Arrendador. Se entiende por reparaciones indispensables, los daños al inmueble de las cosas que están adheridas al inmueble y que se entregaron al arrendatario en el momento de celebrar el contrato de arrendamiento, ejemplo: las instalaciones eléctricas, los calentadores de agua, cambio de tubería, tejas rotas, las humedades, goteras, etc. El arrendatario las debe informar al arrendador para que este las repare.

VIGÉSIMA PRIMERA: DEUDORES SOLIDARIOS.- Los suscritos:
_________________________ con C.C. No _________________________
_________________________ con C.C. No _________________________

Por medio del presente documento nos declaramos deudores del ARRENDADOR en forma solidaria e indivisible junto con el Arrendatario _________________________ de todas las cargas y obligaciones contenidas en el presente contrato, durante el término inicialmente pactado y durante sus prórrogas o renovaciones expresas o tácitas y hasta la restitución real del inmueble al arrendador, por concepto de: Arrendamientos, servicios públicos, indemnizaciones, daños en el inmueble, cuotas de administración, cláusulas penales, costas procesales y cualquier otra derivada del contrato, las cuales podrán ser exigidas por el arrendador a cualquiera de las obligados, por la vía ejecutiva, sin necesidad de requerimientos privados o judiciales a los cuales renunciamos expresamente, sin que por razón de esta solidaridad asumamos el carácter de fiadores, ni arrendatarios del inmueble objeto del presente contrato, pues tal calidad la asume exclusivamente y sus respectivos causahabientes. Todo lo anterior sin perjuicio de que en caso de abandono del inmueble cualquiera de los deudores solidarios pueda hacer entrega válidamente del inmueble al arrendador o a quien éste señale, bien sea judicial o extrajudicialmente. Para este exclusivo efecto el arrendatario otorga poder amplio y suficiente a los deudores solidarios en este mismo acto y al suscribirse el presente contrato. PARAGRAFO: Los deudores solidarios aceptan expresamente desde ahora cualquier cesión que el ARRENDADOR haga respecto del presente contrato y ratifican su voluntad de que la notificación de que trata el artículo 1960 del Código Civil se surta con el solo envío de la nota de cesión, al correo electrónico que aparece registrado en este contrato en la cláusula de notificaciones judiciales.

VIGÉSIMA SEGUNDA: TRATAMENTO DE DATOS PERSONALES Y AUTORIZACIÓN.- En cumplimiento de lo dispuesto en la Ley 1581 de 2012, los datos de carácter personal que suministren el Arrendatario y los Deudores Solidarios en virtud del presente contrato de arrendamiento, serán objeto de tratamiento por parte de ARRENDADOR con la finalidad de desarrollar el contrato durante todas las etapas del mismo y especialmente para: a) El desarrollo de la relación contractual entre el arrendador y el arrendatario. b) La actualización y consulta de datos personales. c) El reporte y la consulta de obligaciones ante las centrales de riesgos. d) La realización de ofertas de asesoría y servicios. e) La realización de campañas comerciales y de mercado sobre servicios afines al arrendamiento. f) La medición de niveles de satisfacción. g) La realización de investigaciones de mercadeo. h) La confirmación de referencias personales y comerciales de conformidad con la información por Usted suministrada. i) El envío de mensajes en torno al contrato de arrendamiento por medio físico o electrónico (correo electrónico, SMS, FAX, o a cualquier otro medio electrónico o al celular). ARRENDADOR se compromete a implementar todas las medidas necesarias para garantizar un tratamiento idóneo de los datos personales y a cumplir con las disposiciones vigentes en la materia. Los derechos que le asisten como Titular son los establecidos en la Ley 1581 de 2012 (Ley General de Protección de Datos) y la Ley 1266 de 2008 (Ley Especial para el hábeas data financiero y crediticio), los cuales se resumen en actualización, rectificación, cancelación y oposición de información de conformidad con lo señalado en la normatividad vigente en la materia que le sea aplicable. En consecuencia, al suscribir este contrato el ARRENDATARIO y los DEUDORES SOLIDARIOS confirman su plena voluntad de AUTORIZAR EXPRESAMENTE al ARRENDADOR para realizar el Tratamiento de los datos personales que han suministrado a éste, bien directamente o bien a través de alguna empresa evaluadora de riesgos. Igualmente aceptan que conocen sus derechos en materia de protección de datos los cuales podrán ejercitar mediante correo físico dirigido a la dirección del arrendador y a través del correo electrónico.

VIGÉSIMA TERCERA: ABANDONO DEL INMUEBLE: Al suscribir este contrato el arrendatario faculta expresamente al arrendador para penetrar en el inmueble y recuperar su tenencia, con el solo requisito de la presencia de dos testigos, en procura de evitar el deterioro o el desmantelamiento de tal inmueble, siempre que por cualquier circunstancia el mismo permaneça abandonado o deshabitado por el término de un mes, sin que el Arrendador reciba pago alguno por concepto de Precio de Arrendamiento y Cuota de Administración, o que amenace la integridad física del bien o la seguridad del vecindario. La misma facultad tendrán los deudores solidarios en caso de abandono del inmueble para efectos de restituirlo al arrendador.

VIGÉSIMA QUARTA: EXENCION DE RESPONSABILIDAD: EL ARRENDATARIO asume la responsabilidad por los daños que se puedan causar al inmueble o a los enseres y dotaciones del mismo, o a los inmuebles y enseres y dotaciones de los vecinos y de los terceros, cuando estos provengan o sean causados por EL ARRENDATARIO, por sus empleados o por descuido o negligencia de cualquiera de los mismos, tales como dejar abiertas llaves del agua o las luces prendidas etc., en cualquier de los casos se compromete a controlar los daños hasta tanto se le dé solución definitiva por quien corresponda. EL ARRENDADOR NO ASUME responsabilidad alguna por los daños o perjuicios que EL ARRENDATARIO possa sufrir por causas atribuibles a terceros, por robos, ni por siniestros causados por incendio o inundación. Serán de cargo, costo y obligaciones de El ARRENDATARIO las medidas de seguridad del inmueble objeto de este contrato.

VIGÉSIMA QUINTA: OBLIGACIONES DEL ARRENDADOR: Son obligaciones del arrendador: a) Entregar al arrendatario en la fecha convenida, o en el momento de la celebración del contrato, el inmueble dado en arrendamiento en buen estado de servicio, seguridad y sanidad y poner a su disposición los servicios, cosas o usos conexos y los adicionales convenidos. b) Mantener en el inmueble los servicios, las cosas y los usos conexos y adicionales en buen estado de servir para el fin convenido en el contrato.

VIGÉSIMA SEXTA: MERITO EJECUTIVO DEL CONTRATO.- Las partes acuerdan que el documento que contiene el contrato, presta merito ejecutivo para efectos extrajudiciales y judiciales, con relación a todas las obligaciones que de éste se deriven, sin importar que la exigibilidad de las mismas, se haga con posterioridad a la restitución del inmueble. Los efectos del título ejecutivo se extenderán aún después de la restitución y hasta el cumplimiento total de las obligaciones a cargo del Arrendatario y Deudores Solidarios.

VIGÉSIMA SEPTIMA: VISITAS DE INSPECCION: El arrendador o su representante debidamente autorizado, está facultado para realizar dos (2) visitas al inmueble en cada año calendario, con la finalidad de constatar la destinación, el estado y conservación del inmueble u otras circunstancias relacionadas con el contrato de arrendamiento, igualmente durante el pre aviso legal para la terminación del contrato, acordando cita previa.

VIGÉSIMA OCTAVA: ENTREGA DE COPIAS: A la suscripción de este documento, las Partes certifican haber recibido copia electrónica del presente contrato de arrendamiento debidamente firmado, cumpliendo con el requisito de «acuso de recibo» exigido por la Ley. Asimismo, el arrendatario acepta haber recibido copia electrónica del Reglamento de Propiedad Horizontal (si aplica). En esa medida, las partes confirman que dicha copia electrónica es auténtica y vinculante y se entienden cumplidas las obligaciones del arrendador contenidas en la Ley 820 de 2003 artículo 8 numerales 3 y 4.

VIGÉSIMA NOVENA: NOTIFICACIONES JUDICIALES: En atención del artículo 103 del Código General del Proceso, con el que se promueve el uso de las tecnologías de la información y de las comunicaciones bajo los principios de equivalencia funcional y neutralidad electrónica, así como del artículo 82 numeral 10 del mismo Código en el que se tiene por requisito informar las direcciones electrónicas, las partes convienen que para efectos de notificaciones judiciales y extrajudiciales, relacionadas directa o indirectamente con el contrato de arrendamiento, las mismas serán remitidas a los siguientes correos electrónicos relacionados en las firmas.

TRIGÉSIMA: FIRMA ELECTRÓNICA. Las Partes de común acuerdo manifiestan que el presente documento puede suscribirse a través de la de firma electrónica. Y para este fin utilizarán el servicio de firma electrónica de una empresa autorizada.
En esa medida, las Partes han convenido que conocen, entienden y aceptan que:
A. Es un servicio online de firma electrónica, cuya función consiste en permitir el envío de documentos y la suscripción electrónica de los mismos. Este servicio funciona por medio de una plataforma de internet.
B. La firma electrónica emitida suscrita por las partes cumple con los requisitos legais dispuestos en la Ley 527 de 1999, el Decreto 2364 de 2012 y demás normas que las adicionen e/o modifiquen. La firma electrónica utiliza mecanismos técnicos de identificación personal que son seguros y confiables, para efecto de garantizar la autenticidad e integridad de los documentos que se suscriban por medio de este método de firma electrónica.
C. La firma electrónica utilizada en el presente documento tendrá la misma validez y efectos jurídicos que la firma manuscrita. Lo anterior para todos los efectos o actos a que haya lugar.
D. Acatando lo estipulado por el artículo 244 del Código General del proceso y en aplicación del principio de equivalencia funcional, este documento suscrito mediante firma electrónica es auténtico y original, sin que haya lugar a repudio, ni tacha de falsedad.
Por la firma del presente documento, las Partes reconocen, entienden y aceptan los Términos y Condiciones de Uso de la Firma Electrónica, así como las obligaciones derivadas de dicho uso.

CLAUSULAS ADICIONALES:
____________________________________________________________________________________

Para constancia se firma por las partes Hoy, ___ de __________ de 2025.

ARRENDADOR
NOMBRE _________________________
C.C. No. _________________________ de _________________________
Dirección de Notificaciones: _________________________
Teléfono: _________________________
Correo Electrónico: _________________________

ARRENDATARIO
NOMBRE _________________________
C.C. No. _________________________ de _________________________
Dirección de Notificaciones: _________________________
Teléfono: _________________________
Correo Electrónico: _________________________

DEUDORES SOLIDARIOS
NOMBRE _________________________
C.C. No. _________________________ de _________________________
Dirección de Notificaciones: _________________________
Teléfono: _________________________
Correo Electrónico: _________________________

NOMBRE _________________________
C.C. No. _________________________ de _________________________
Dirección de Notificaciones: _________________________
Teléfono: _________________________
Correo Electrónico: _________________________

Esta hoja hace parte integral del contrato de arrendamiento firmado entre el arrendador _________________________ y el arrendatario _________________________.
`;

export const RENTAL_CONTRACT_TEMPLATE_COMERCIAL = `CONTRATO DE INMUEBLE DESTINO COMERCIO 2025

ARRENDADOR: Representante Legal: _________________________ con NIT. _________________________ con C.C. No. __________ de __________
ARRENDATARIO: Representante Legal: _________________________ con NIT. _________________________ con C.C. No. __________ de __________

CONDICIONES GENERALES

PRIMERA: OBJETO DEL CONTRATO: Mediante el presente contrato que se rige por el Código de Comercio, el arrendador concede al arrendatario el goce del inmueble que adelante se identifica por su dirección y linderos, de acuerdo con el inventario que las partes firman por separado y que forma parte integral de este contrato.

SEGUNDA: DIRECCIÓN DEL INMUEBLE: _________________________ en la ciudad de _________________________; Este inmueble está identificado en la Oficina de Registro de Instrumentos Públicos de _________________________ con la Matrícula Inmobiliaria número _________________________.

TERCERA: LINDEROS DEL INMUEBLE ARRENDADO: Los linderos se relacionan en hoja anexa, que hace parte integral de este contrato. PARAGRAFO: No obstante el área y linderos, dicho inmueble se entrega como cuerpo cierto y no por cabida.

CUARTA: DESTINACIÓN: El arrendatario se compromete a destinar este inmueble exclusivamente para el desarrollo de las siguientes actividades comerciales: _________________________. PARAGRAFO 1: No podrá el Arrendatario darle un uso diferente al aquí señalado so pena de responder por todos los daños, perjuicios e indemnizaciones que se causen a él Arrendador o a terceros. PARAGRAFO 2: EL ARRENDATARIO manifiesta expresamente que indagó sobre el uso del suelo permitido en el inmueble materia de este contrato y manifiesta que cuenta con los respectivos permisos y licencias para la actividad que desarrollará en el inmueble dado en arrendamiento, ante las autoridades respectivas y en tal sentido libera de cualquier responsabilidad al ARRENDADOR en caso de multas o cualquier otra sanción de tipo judicial o administrativo por el cumplimiento de las normas que regulan el funcionamiento de establecimientos para la destinación aquí pactada, no pudiendo EL ARRENDATARIO dar por terminado el contrato alegando la decisión de la autoridad al respecto. PARAGRAFO 3: EL ARRENDADOR prohíbe expresa y terminantemente a EL ARRENDATARIO dar al inmueble destinación con fines ilícitos tales como los contemplados en el literal b) del parágrafo del artículo 3 del decreto 180 de 1.988 y el artículo 34 de la ley 30 de 1.986, и cualquier norma de carácter nacional, departamental o distrital, en consecuencia EL ARRENDATARIO se obliga a no utilizar el inmueble objeto de este contrato, para ocultar como depósito de armas o explosivos o dineros de grupos terroristas o artículos de contrabando o para que en él se elaboren o almacenen, vendan drogas estupefacientes o sustancias alucinógenas y afines, así como para usar el inmueble para realizar actividades no autorizadas por la SUPERINTENDENCIA FINANCIERA DE COLOMBIA o cualquier otra entidad o autoridad, en contra de la ley y las buenas costumbres. EL ARRENDATARIO se obliga a no guardar o permitir que se guarden en el inmueble arrendado sustancias inflamables o explosivas que pongan en peligro la seguridad de él, y en caso que ocurriera dentro del inmueble enfermedad infecto contagiosa, serán de EL ARRENDATARIO los gastos de desinfección que ordenen las autoridades sanitarias.

QUINTA: CANON O PRECIO DEL ARRENDAMIENTO.- El Arrendatario pagará al Arrendador mensualmente, por concepto de canon de arrendamiento la suma de $_________) pesos m/cte, mensuales, pagaderos dentro de los cinco (5) primeros días de cada período mensual, por anticipado, al arrendador o a su orden. Excepto que la destinación de este inmueble sea para “Espacios de Exposiciones y Muestras Artesanales Nacionales, el arrendatario pagará también por cada mes al arrendador por concepto de impuesto a las ventas, el monto que la Ley tributaria determine, pago que hará en el mismo plazo y condiciones convenidos para el precio del arrendamiento. Este contrato es título ejecutivo suficiente para el cobro de este impuesto.

SEXTA: REAJUSTE EN EL CANON DE ARRENDAMIENTO.- Vencido el primer año de vigencia de este contrato y así sucesivamente cada doce (12) mensualidades, en caso de prórroga tácita o expresa, en forma automática y sin necesidad de requerimiento alguno entre las partes, el precio mensual del arrendamiento se incrementará anualmente en un porcentaje igual al ciento por ciento (100%) del Índice de Precios al Consumidor (I.P.C.) del año calendario inmediatamente anterior a aquél en que se efectúe el incremento, más (LETRA Y NÚMERO) puntos porcentuales. Al suscribir este contrato el arrendatario y los deudores solidarios quedan plenamente notificados de todos los reajustes automáticos pactados en este contrato y que han de operar durante la vigencia del mismo. La falta de notificación del reajuste por parte del Arrendador no se entenderá como la aceptación de continuar el contrato sin el incremento del canon.

SEPTIMA: CUOTAS DE ADMINISTRACIÓN: Se obliga también el Arrendatario a cancelar al Arrendador la suma de $_________________________ pesos m/cte, por concepto de cuota mensual de administración, pagadera por anticipado dentro de los cinco (5) primeros días de cada mensualidad. Este valor se reajustará automáticamente en la fecha y proporción que establezca la asamblea de la copropiedad, sin necesidad de requerimiento alguno, el Arrendatario estará obligado a pagar el reajuste señalado por la copropiedad. El arrendatario y los deudores solidarios renuncian expresamente a los requerimientos para constitución en mora respecto de esta obligación pecuniaria. PARAGRAFO: Las cuotas extraordinarias de administración serán responsabilidad del Arrendador.

OCTAVA: LUGAR PARA EL PAGO: Salvo pacto expreso entre las partes, el arrendatario pagará el precio del arrendamiento y las cuotas de administración al arrendador en la CUENTA No. _________________________ del Banco _________________________ a nombre de _________________________. Para efectos de cumplimiento del pago, EL ARRENDATARIO se obliga a enviar a la dirección de notificación de EL ARRENDADOR dentro de los primeros 5 días de cada período mensual, el comprobante de pago virtual o físico donde se evidencie la transferencia realizada por el monto indicado a la cuenta anteriormente descrita. Queda establecido que los períodos mensuales son indivisibles, y por lo tanto EL ARRENDATARIO debe pagar el canon pactado en su totalidad, cualquiera que sea el número de días que ocupe el inmueble durante el período respectivo. PARAGRAFO: SI EL ARRENDADOR ha efectuado la correspondiente reclamación a SEGUROS COMERCIALES BOLIVAR S.A., por incumplimiento del contrato, El Arrendatario o cualquiera de los deudores solidarios deberán pagar directamente en la cuenta y en los términos que le indique la Compañía Aseguradora o a su delegada.

NOVENA: VIGENCIA DEL CONTRATO: Doce (12) meses, que comienzan a contarse el día ___ de __________ de ________.

DECIMA: PRÓRROGA Y RENOVACION.- Vencido el término inicial de vigencia de este contrato, si ninguna de las partes ha comunicado a la otra por escrito, su intención de darlo por terminado o de renovarlo, el término de vigencia del contrato se prorrogará automáticamente en iguales condiciones y por períodos sucesivos iguales al inicialmente pactado.

DÉCIMA PRIMERA: SERVICIOS: Todos los servicios públicos (Acueducto, Alcantarillado, Aseo, Energía, Gas, Línea Telefónica #__________) facturados por la entidad prestadora de los mismos desde la entrega material del inmueble y hasta el día de la restitución del mismo, serán de cargo del Arrendatario y/o Deudores Solidarios. Los servicios de carácter privado, tales como antena parabólica, televisión satelital o por cable, Internet, Banda Ancha, avisos en páginas amarillas o cualquier otro, serán responsabilidad directa y exclusiva del arrendatario sobre lo cual EL ARRENDADOR confiere autorización, pero no solidaridad alguna para su instalación y costos de servicio. EL ARRENDADOR no autoriza a EL ARRENDATARIO a adquirir créditos, pólizas fúnebres, periódicos, revistas, comprar electrodomésticos y demás mediante las facturas de los servicios públicos. PARAGRAFO 1.:El presente documento junto con los recibos cancelados por el arrendador constituye título ejecutivo para cobrar judicialmente a el Arrendatario y/o Deudores Solidarios los servicios que dejaren de pagar siempre que tales montos correspondan al período en el que estes tuvieron en su poder el inmueble. PARAGRAFO 2.- El Arrendador no se hace responsable, en ningún caso, de las deficiencias en la prestación de los mencionados servicios públicos; y será obligación expresa del Arrendatario el estricto cumplimiento de las disposiciones y reglamentos de las empresas prestadores de tales servicios.

DÉCIMA SEGUNDA: COSAS O USOS CONEXOS: Además del inmueble identificado y descrito anteriormente, tendrá el ARRENDATARIO derecho de goce sobre los siguientes bienes y usos: _________________________ de todas las zonas comunes existentes, de acuerdo a lo estipulado en el Reglamento de Propiedad Horizontal, el cual declara conocer y se obliga a cumplir.

DÉCIMA TERCERA: CLÁUSULA PENAL: El incumplimiento por parte del Arrendatario y/o deudores Solidarios de las cláusulas de este contrato, lo constituirá en deudor del Arrendador por una suma equivalente a dos (2) cánones mensuales del arrendamiento que esté vigente en el momento en que tal incumplimiento se presente a título de pena. Se entenderá, en todo caso, que el pago de la pena no extingue la obligación principal y que el arrendador podrá pedir a la vez el pago de la pena y la indemnización de perjuicios, si es el caso. Este contrato será prueba sumaria suficiente para el cobro de esta pena y el Arrendatario y los Deudores Solidarios renuncian expresamente a cualquier requerimiento privado o judicial para constituirlos en mora del pago de esta o cualquier otra obligación derivada del contrato.

DÉCIMA QUARTA: ESPACIOS EN BLANCO: El arrendatario faculta expresamente al arrendador para llenar en documentos adjuntos a este contrato los espacios en blanco, referente a los linderos, inventario, actualización de nomenclatura y recibo de inmueble.

DECIMA QUINTA: REQUERIMENTOS: El Arrendatario y Deudores Solidarios renuncian expresamente a todos e cada uno de los requerimientos legais establecidos, artículo 2007 del Código Civil y en general a todos los que consagre cualquier norma sustancial o procesal para efectos de la constitución en mora.

DÉCIMA SEXTA: PREAVISOS PARA LA ENTREGA: Las partes se obligan a informar por medio de comunicación escrita, su decisión de dar por terminado el presente contrato de arrendamiento entregando el inmueble, con una antelación de seis (6) meses, a la fecha de finalización del plazo inicial o de la prórroga.

DÉCIMA SEPTIMA: CAUSALES DE TERMINACIÓN: A favor del arrendador serán las siguientes: El Arrendador podrá dar por terminado el contrato de arrendamiento de manera unilateral cuando ocurran los siguientes hechos: a) La cesión o subarriendo sin autorización previa y expresa del arrendador. b) El cambio de destinación del inmueble. c) El incumplimiento de la obligación de pagar el valor mensual del canon y/o los incrementos respectivos, dentro del término establecido. d) La destinación del inmueble para fines ilícitos, ilegales o inmorales. e) La realización de mejoras, cambios, ampliaciones y en general cualquier modificación del inmueble, sin autorización expresa del arrendador. f) El incumplimiento del arrendatario en el pago de los servicios públicos, desconexión o pérdida definitiva del servicio por causa atribuible al arrendatario. g) Incumplir con el pago del valor establecido como cuota de administración. h) Las demás previstas en la ley. i) Que el arrendatario y/o deudores solidarios aparezcan en listas vinculantes/restrictivas (ONU/OFAC) o condenas asociadas a delitos de lavados de activos A favor del arrendatario serán las siguientes: a) La suspensión de la prestación de los servicios públicos al inmueble, por acción premeditada del arrendador o porque incurra en mora en pagos que estuvieran a su cargo. En estos casos, el arrendatario podrá optar por asumir el costo del restablecimiento del servicio y descontarlo de los pagos que le corresponda hacer como arrendatario. b) La incursión reiterada del arrendador en procederes que afecten gravemente el disfrute cabal por el arrendatario del inmueble arrendado, debidamente comprobada ante la autoridad policiva. c) El desconocimiento por parte del arrendador de derechos reconocidos al arrendatario por la Ley o contractualmente.

DÉCIMA OCTAVA: CESIÓN DE LOS DERECHOS: Las partes aquí contratantes, estipulan expresamente que este contrato no formará parte integral de ningún establecimiento de comercio, y que por lo tanto, la enajenación o venta del establecimiento que eventualmente se establezca en el inmueble, no solo no transfiere ningún derecho de arrendamiento al adquiriente, sino que constitue causal de terminación del contrato, toda vez que el Arrendatario y los Deudores Solidarios se obligan expresamente a no ceder, a no subarrendar el inmueble, ni transferir su tenencia. Para los efectos legales, esta estipulación equivale a la oposición a que se refere el numeral 3 del artículo 528 del Código de Comercio, de tal suerte que la responsabilidad del arrendatario y los deudores solidarios no cesará con la enajenación del establecimiento de comercio, ni con el aviso de la transferencia, ni aún con la inscripción de la enajenación en el Registro Mercantil. PARAGRAFO 1: Si a pesar de la prohibición aquí señalada se produce la venta de establecimiento de comercio, el comprador o adquirente del establecimiento de comercio será solidario en el cumplimiento de las obligaciones derivadas del contrato de arrendamiento, sin que signifique que el arrendatario inicial possa renunciar a las obligaciones adquiridas. PARAGRAFO 2: El Arrendatario y los deudores Solidarios conocen y aceptan desde ahora, que el Arrendador podrá ceder libremente los derechos que emanan de este contrato y tal cesión producirá efeitos respecto del arrendatario y de los deudores solidarios, a partir de la fecha de la notificación formal de la nota de cesión, enviada por correo certificado.

DÉCIMA NOVENA: ENTREGA Y ESTADO DEL INMUEBLE: El Arrendatario declara que ha recibido el inmueble objeto de este contrato en buen estado, y se compromete a restituirlo en las mismas condiciones que se registran en el inventario inicial de entrega que hace parte integral del presente contrato, a la terminación del arrendamiento, o cuando éste haya de cesar por alguna de las causales estipuladas, salvo el deterioro natural proveniente del paso del tiempo y del uso normal legítimo del inmueble. Las reparaciones locativas le corresponden al Arrendatario de conformidad con el artículo 1998 del Código Civil.

VIGÉSIMA: MEJORAS: El Arrendatario y/o Deudores Solidarios dejan constancia que han recibido en las condiciones requeridas para los fines propuestos, por lo tanto No podrán sin el permiso escrito del Arrendador efectuar en el inmueble mejoras, reformas o adiciones de ninguna especie, excepto las reparaciones locativas; en caso de que el Arrendador acepte realizar las mejoras ellas accederán al propietario del inmueble sin derecho a retirarlas y/o cobrar el valor de las mismas. El Arrendatario renuncia expresamente a descontar de la renta el valor de las reparaciones indispensables no locativas, a que se refiere el artículo 27 de la Ley 820 de 2003. PARAGRAFO: Las reparaciones locativas son aquellas que están a la vista del inmueble y en uso por el arrendatario, ejemplo: tomas, bombillos, Ilaves, puertas, chapas, botones de estufa, etc. (cuando se hace entrega del inmueble al arrendatario según inventario, están funcionando, pero por el uso, se dañan), están a cargo del Arrendatario, por Ley, y este las debe reparar con su propio gasto, no se pueden descontar del canon de arrendamiento. Las reparaciones indispensables por el contrario, si le corresponden al Arrendador. Se entiende por reparaciones indispensables, los daños al inmueble de las cosas que están adheridas al inmueble y que se entregaron al arrendatario en el momento de celebrar el contrato de arrendamiento, ejemplo: las instalaciones eléctricas, los calentadores de agua, cambio de tubería, tejas rotas, las humedades, goteras, etc. El arrendatario las debe informar al arrendador para que este las repare.

VIGÉSIMA PRIMERA: DEUDORES SOLIDARIOS.- Los suscritos:
_________________________ con C.C. No _________________________
_________________________ con C.C. No _________________________

Por medio del presente documento nos declaramos deudores del ARRENDADOR en forma solidaria e indivisible junto con el Arrendatario arrendatario o su eventual cesionario de todas las cargas y obligaciones contenidas en el presente contrato, durante el término inicialmente pactado y durante las prórrogas o renovaciones expresas o tácitas hasta la restitución o entrega formal del inmueble al Arrendador, por concepto de: Arrendamientos, servicios públicos, indemnizaciones, daños en el inmueble, cuotas de administración, cláusulas penales, costas procesales y cualquier otra derivada de este contrato, las cuales podrán ser exigidas por el arrendador a todos a algunos o a cualquiera de los aquí obligados, por la vía ejecutiva, sin necesidad de requerimientos privados o judiciales a los cuales renunciamos expresamente, sin que por razón de esta solidaridad asumamos el carácter de fiadores, ni arrendatarios del inmueble objeto del presente contrato, pues tal calidad la asume exclusivamente el Arrendatario y sus respectivos causahabientes, hasta que hayan sido cumplidas en su totalidad. Todo lo anterior sin perjuicio de que en caso de abandono del inmueble cualquiera de los deudores solidarios pueda hacer entrega válidamente del inmueble al arrendador o a quien éste señale, bien sea judicial o extrajudicialmente. Para este exclusivo efecto el Arrendatario otorga poder amplio y suficiente a los deudores solidarios en este mismo acto y al suscribirse el presente contrato. PARAGRAFO: CESIÓN DEL CONTRATO.- Los Deudores Solidarios aceptan expresamente desde ahora cualquier cesión que el ARRENDADOR haga respecto del presente contrato y ratifican su voluntad para que la notificación de que trata el artículo 1960 del Código Civil, se surta con el envío de la correspondiente nota de cesión por correo certificado, al correo electrónico que aparece registrado en este contrato en la cláusula de notificaciones judiciales.

VIGÉSIMA SEGUNDA: VISITAS DE INSPECCION: El arrendador o su representante debidamente autorizado, está facultado para visitar el inmueble en cualquier tiempo, con la finalidad de constatar la destinación, el estado y conservación del inmueble u otras circunstancias relacionadas con el contrato de arrendamiento, así mismo durante el pre aviso legal para la terminación del contrato, acordando cita previa cuando se trate de inmuebles diferentes a locales comerciales.

VIGÉSIMA TERCERA: GOOD WILL: EL ARRENDATARIO se obliga a que, bajo ninguna circunstancia, pretenderá pedir al ARRENDADOR del inmueble y/o a quienes tengan derechos de posesión o reales inscritos, suma alguna por conceptos tales como haber logrado una buena clientela, haber acreditado y posesionado el establecimiento, primas, buen nombre o “GoodWill" o similares por acreencia del establecimiento comercial.

VIGÉSIMA QUARTA: TRATAMENTO DE DATOS PERSONALES Y AUTORIZACIÓN.- En cumplimiento de lo dispuesto en la Ley 1581 de 2012, los datos de carácter personal que suministre el Arrendatario y los Deudores Solidarios en virtud del presente contrato de arrendamiento, serán objeto de tratamiento por parte de arrendador con la finalidad de desarrollar el contrato durante todas las etapas del mismo y especialmente para: a) El desarrollo de la relación contractual entre el arrendador y el arrendatario. b) La actualización y consulta de datos personales. c) El reporte y la consulta de obligaciones ante las centrales de riesgos. d) La realización de ofertas de asesoría y servicios. e) La realización de campañas comerciales y de mercado sobre servicios afines al arrendamiento. f) La medición de niveles de satisfacción. g) La realización de investigaciones de mercadeo. h) La confirmación de referencias personales y comerciales de conformidad con la información por usted suministrada. i) El envío de mensajes en torno al contrato de arrendamiento por medio físico o electrónico (correo electrónico, SMS, FAX, o a cualquier otro medio electrónico o al celular). arrendador se compromete a implementar todas las medidas necesarias para garantizar un tratamiento idóneo de los datos personales y a cumplir con las disposiciones vigentes en la materia. Los derechos que le asisten como Titular son los establecidos en la Ley 1581 de 2012 (Ley General de Protección de Datos) y la Ley 1266 de 2008 (Ley Especial para el hábeas data financiero y crediticio), los cuales se resumen en actualización, rectificación, cancelación y oposición de información de conformidad con lo señalado en la normatividad vigente en la materia que le sea aplicable. En consecuencia, al suscribir este contrato el ARRENDATARIO y los DEUDORES SOLIDARIOS confirman su plena voluntad de AUTORIZAR EXPRESAMENTE al ARRENDADOR para realizar el Tratamiento de los datos personales que han suministrado a éste, bien directamente o bien a través de alguna empresa evaluadora de riesgos. Igualmente aceptan que conocen sus derechos en materia de protección de datos los cuales podrán ejercitar mediante correo físico dirigido a la dirección del arrendador y a través del correo electrónico.

VIGÉSIMA QUINTA: ABANDONO DEL INMUEBLE: Al suscribir este contrato el Arrendatario faculta expresamente al Arrendador para ingresar en el inmueble y recuperar su tenencia, con el solo requerimiento de la presencia de dos testigos, en procura de evitar el deterioro o el desmantelamiento de inmueble, siempre que por cualquier circunstancia el mismo permaneza abandonado o deshabitado por el término de un (1) mes, sin que el Arrendador reciba pago alguno por concepto de Precio de Arrendamiento y Cuota de Administración,o que amenace la integridad física del bien o la seguridad del vecindario. La misma facultad tendrán los deudores solidarios en caso de abandono del inmueble para efectos de restituirlo al arrendador.

VIGÉSIMA SEXTA: EXENCIÓN DE RESPONSABILIDAD: EI ARRENDADOR no asume responsabilidad alguna por los daños o perjuicios causados al inmueble, a los bienes o cosas que él se guarnezcan y/o a las personas, que pueda sufrir por causas atribuibles a terceros, del mismo arrendatario o por el mismo inmueble, o proveniente de sus empleados o dependientes, ni por robos, hurtos ni por siniestros causados por incendio, inundación o terrorismo. Serán de cargo, costo y obligaciones de El ARRENDATARIO las medidas de seguridad del inmueble objeto de este contrato.

VIGÉSIMA SEPTIMA: OBLIGACIONES DEL ARRENDADOR: Son obligaciones del arrendador: a) Entregar al arrendatario en la fecha convenida, o en el momento de la celebración del contrato, el inmueble dado en arrendamiento en buen estado de servicio, seguridad y sanidad y poner a su disposición los servicios, cosas o usos conexos y los adicionales convenidos. b) Mantener en el inmueble los servicios, las cosas y los usos conexos y adicionales en buen estado de servir para el fin convenido en el contrato.

VIGÉSIMA OCTAVA: MERITO EJECUTIVO DEL CONTRATO.- Las partes acuerdan que el documento que contiene el contrato, presta merito ejecutivo para efectos extrajudiciales y judiciales, con relación a todas las obligaciones que de éste se deriven, sin importar que la exigibilidad de las mismas, se haga con posterioridad a la restitución del inmueble. Los efectos del título ejecutivo se extenderán aún después de la restitución y hasta el cumplimiento total de las obligaciones a cargo del Arrendatario y Deudores Solidarios.

VIGÉSIMA NOVENA: ENTREGA DE COPIAS: A la suscripción de este documento, las Partes certifican haber recibido copia electrónica del presente contrato de arrendamiento debidamente firmado, cumpliendo con el requisito de «acuso de recibo» exigido por la Ley. Asimismo, el arrendatario acepta haber recibido copia electrónica del Reglamento de Propiedad Horizontal (si aplica). En esa medida, las partes confirman que dicha copia electrónica es auténtica y vinculante y se entienden cumplidas las obligaciones del arrendador contenidas en la Ley 820 de 2003 artículo 8 numerales 3 y 4.

TRIGÉSIMA: NOTIFICACIONES JUDICIALES: En atención del artículo 103 del Código General del Proceso, con el que se promueve el uso de las tecnologías de la información y de las comunicaciones bajo los principios de equivalencia funcional y neutralidad electrónica, así como del artículo 82 numeral 10 del mismo Código en el que se tiene por requisito informar las direcciones electrónicas, las partes convienen que para efectos de notificaciones judiciales y extrajudiciales, relacionadas directa o indirectamente con el contrato de arrendamiento, las mismas serán remitidas a los siguientes correos electrónicos relacionados en las firmas.

TRIGÉSIMA: FIRMA ELECTRÓNICA. Las Partes de común acuerdo manifiestan que el presente documento puede suscribirse a través de la de firma electrónica. Y para este fin utilizarán el servicio de firma electrónica de una empresa autorizada.
En esa medida, las Partes han convenido que conocen, entienden y aceptan que:
A. Es un servicio online de firma electrónica, cuya función consiste en permitir el envío de documentos y la suscripción electrónica de los mismos. Este servicio funciona por medio de una plataforma de internet.
B. La firma electrónica emitida suscrita por las partes cumple con los requisitos legais dispuestos en la Ley 527 de 1999, el Decreto 2364 de 2012 y demás normas que las adicionen y/o modifiquen. La firma electrónica utiliza mecanismos técnicos de identificación personal que son seguros y confiables, para efecto de garantizar la autenticidad e integridad de los documentos que se suscriban por medio de este método de firma electrónica.
C. La firma electrónica utilizada en el presente documento tendrá la misma validez y efectos jurídicos que la firma manuscrita. Lo anterior para todos los efectos o actos a que haya lugar.
D. Acatando lo estipulado por el artículo 244 del Código General del proceso y en aplicación del principio de equivalencia funcional, este documento suscrito mediante firma electrónica es auténtico y original, sin que haya lugar a repudio, ni tacha de falsedad.
Por la firma del presente documento, las Partes reconocen, entienden y aceptan los Términos y Condiciones de Uso de la Firma Electrónica, así como las obligaciones derivadas de dicho uso.

CLAUSULAS ADICIONALES:
____________________________________________________________________________________

Para constancia se firma por las partes Hoy, ___ de __________ de 2025.

ARRENDADOR
NOMBRE _________________________
C.C. No. _________________________ de _________________________
Dirección de Notificaciones: _________________________
Teléfono: _________________________
Correo Electrónico: _________________________

ARRENDATARIO
NOMBRE _________________________
C.C. No. _________________________ de _________________________
Dirección de Notificaciones: _________________________
Teléfono: _________________________
Correo Electrónico: _________________________

DEUDORES SOLIDARIOS
NOMBRE _________________________
C.C. No. _________________________ de _________________________
Dirección de Notificaciones: _________________________
Teléfono: _________________________
Correo Electrónico: _________________________

NOMBRE _________________________
C.C. No. _________________________ de _________________________
Dirección de Notificaciones: _________________________
Teléfono: _________________________
Correo Electrónico: _________________________
Esta hoja hace parte integral del contrato de arrendamiento firmado entre el arrendador _________________________ y el arrendatario _________________________.
`;


export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  SEND_REQUEST: "/send-request",
  REQUESTS_DASHBOARD: "/requests",
  REQUEST_DETAIL: "/request/:requestId",
  FORGOT_PASSWORD: "/forgot-password",
  CONTRACT_SIGNING: "/contract-signing",
  CONTRACT_DETAIL: "/contract/:contractId",
};

// Representa una fila en la hoja de "Credenciales"


// Datos de prueba para las credenciales, para evitar la llamada de red.
export const MOCK_CREDENTIALS: Credential[] = [
  { inmobiliaria: "INMOBILIARIA BOGOTA S.A.", nit: "8600123", email: "contacto@inmobogota.com", poliza: "5001353", password_asignada: "pass123", estado: "Activo" },
  { inmobiliaria: "ARRENDAMIENTOS ABC", nit: "9001234", email: "info@arriendosabc.co", poliza: "5001354", password_asignada: "pass123", estado: "Activo" },
  { inmobiliaria: "METRO CUADRADO FINCA RAIZ", nit: "8005678", email: "servicio@m2.com", poliza: "5001355", password_asignada: "pass123", estado: "Activo" },
  { inmobiliaria: "MI CASA PROPIA", nit: "8309876", email: "ventas@micasapropia.com.co", poliza: "5001356", password_asignada: "pass123", estado: "Activo" },
];

// Datos simulados de la hoja "Cupo disponible" del Google Sheet.
// En un entorno de producción, esto se obtendría a través de una API.
export const MOCK_CUPO_DATA: CupoData[] = [
  { nit: "8600123", asignadas: 100, usadas: 25 },
  { nit: "9001234", asignadas: 50, usadas: 48 },
  { nit: "8005678", asignadas: 200, usadas: 150 },
  { nit: "8309876", asignadas: 75, usadas: 10 },
];


export const INITIAL_REQUESTS: Solicitud[] = [
    {
      id: 'SOL-123456',
      tipoDocumento: TipoDocumento.CEDULA_CIUDADANIA,
      numeroDocumento: '1020304050',
      numeroCelular: '3001112233',
      correoElectronico: 'cliente1@example.com',
      fechaEnvio: '2024-05-20T10:00:00.000Z',
      estado: EstadoSolicitud.EXITOSO,
      biometriaUrl: 'https://demo.biometria.com/123456',
      idValidation: 'VALID-XYZ-001',
    },
    {
      id: 'SOL-789012',
      tipoDocumento: TipoDocumento.CEDULA_CIUDADANIA,
      numeroDocumento: '1098765432',
      numeroCelular: '3109998877',
      correoElectronico: 'cliente2@example.com',
      fechaEnvio: '2024-05-21T14:30:00.000Z',
      estado: EstadoSolicitud.PENDIENTE,
      fechaVencimientoLink: '2024-05-23T14:30:00.000Z',
      biometriaUrl: 'https://demo.biometria.com/789012',
      idValidation: 'VALID-XYZ-002',
    },
     {
      id: 'SOL-345678',
      tipoDocumento: TipoDocumento.CEDULA_EXTRANJERIA,
      numeroDocumento: '987654',
      numeroCelular: '3205556677',
      correoElectronico: 'cliente3@example.com',
      fechaEnvio: '2024-05-18T09:00:00.000Z',
      estado: EstadoSolicitud.VENCIDO,
      fechaVencimientoLink: '2024-05-20T09:00:00.000Z',
      biometriaUrl: 'https://demo.biometria.com/345678',
      idValidation: 'VALID-XYZ-003',
    },
     {
      id: 'SOL-901234',
      tipoDocumento: TipoDocumento.PASAPORTE,
      numeroDocumento: 'AB123456',
      numeroCelular: '3012345678',
      correoElectronico: 'visitor@example.com',
      fechaEnvio: '2024-05-19T11:00:00.000Z',
      estado: EstadoSolicitud.NO_EXITOSO,
      biometriaUrl: 'https://demo.biometria.com/901234',
      idValidation: 'VALID-XYZ-004',
    }
];

export const MOCK_CONTRACTS: Contrato[] = [
  {
    id: 'CON-ABCDE1',
    fileName: 'Contrato Arriendo Apto 101.pdf',
    status: EstadoContrato.FIRMADO,
    createdAt: '2024-05-15T10:00:00Z',
    expiresAt: '2024-05-22T10:00:00Z',
    signers: [
      { id: 'signer-1', name: 'Juan Perez', tipoDocumento: TipoDocumento.CEDULA_CIUDADANIA, doc: '12345678', email: 'juan.perez@email.com', phone: '3001234567', role: SignerRole.ARRENDATARIO },
      { id: 'signer-2', name: 'Maria Rodriguez', tipoDocumento: TipoDocumento.CEDULA_CIUDADANIA, doc: '87654321', email: 'maria.r@email.com', phone: '3109876543', role: SignerRole.ARRENDADOR }
    ],
    signatures: [
      { signerId: 'signer-1', signatureImage: `https://via.placeholder.com/200x100.png?text=Firma+Juan`, photoImage: `https://picsum.photos/seed/12345678/150/150`, timestamp: '2024-05-16T11:00:00Z', geolocation: { lat: 4.60971, long: -74.08175 } },
      { signerId: 'signer-2', signatureImage: `https://via.placeholder.com/200x100.png?text=Firma+Maria`, photoImage: `https://picsum.photos/seed/87654321/150/150`, timestamp: '2024-05-17T09:30:00Z', geolocation: { lat: 4.60971, long: -74.08175 } }
    ],
    templateContent: RENTAL_CONTRACT_TEMPLATE_VIVIENDA.replace('_________________________', 'Juan Perez').replace('ARRENDATARIO: _________________________', 'ARRENDATARIO: Maria Rodriguez'),
  },
  {
    id: 'CON-FGHIJ2',
    fileName: 'Contrato Local Comercial Centro.pdf',
    status: EstadoContrato.PENDIENTE,
    createdAt: '2024-05-20T15:00:00Z',
    expiresAt: '2024-05-27T15:00:00Z',
    signers: [
      { id: 'signer-3', name: 'Carlos Gomez', tipoDocumento: TipoDocumento.CEDULA_CIUDADANIA, doc: '11223344', email: 'carlos.g@email.com', phone: '3201112233', role: SignerRole.ARRENDATARIO, idValidation: 'VALID-XYZ-100' },
      { id: 'signer-4', name: 'Ana Torres', tipoDocumento: TipoDocumento.CEDULA_CIUDADANIA, doc: '44332211', email: 'ana.t@email.com', phone: '3018887766', role: SignerRole.DEUDOR_SOLIDARIO, idValidation: 'VALID-XYZ-101' }
    ],
    signatures: [],
    templateContent: 'Contenido de la plantilla para el contrato comercial...',
  },
  {
    id: 'CON-KLMNO3',
    fileName: 'Contrato Bodega Industrial.pdf',
    status: EstadoContrato.VENCIDO,
    createdAt: '2024-04-10T12:00:00Z',
    expiresAt: '2024-04-17T12:00:00Z',
    signers: [
      { id: 'signer-5', name: 'Lucia Fernandez', tipoDocumento: TipoDocumento.CEDULA_CIUDADANIA, doc: '55667788', email: 'lucia.f@email.com', phone: '3153334455', role: SignerRole.ARRENDATARIO }
    ],
    signatures: [],
    templateContent: 'Contenido de la plantilla para el contrato de bodega...',
  }
];


export const MONTHLY_REQUEST_DATA: ChartDataPoint[] = [
  { month: 'Ene', disponibles: 100, consumidas: 20 },
  { month: 'Feb', disponibles: 100, consumidas: 35 },
  { month: 'Mar', disponibles: 100, consumidas: 50 },
  { month: 'Abr', disponibles: 100, consumidas: 15 },
  { month: 'May', disponibles: 100, consumidas: 25 },
];
-- 1. Creación de la base de datos
CREATE DATABASE BodegaPeiranoDB;
GO

USE BodegaPeiranoDB;
GO

-- A partir de aquí pega tu script de CREATE TABLE...

-- tables
-- Table: category
CREATE TABLE category (
    id_category int  NOT NULL,
    name varchar(50)  NOT NULL,
    description varchar(150)  NULL,
    status bit  NOT NULL,
    created_at datetime  NOT NULL,
    category_code char(3)  NOT NULL,
    CONSTRAINT category_pk PRIMARY KEY  (id_category)
);

-- Table: customer
CREATE TABLE customer (
    id_customer int  NOT NULL,
    document_type char(3)  NOT NULL,
    document_number varchar(12)  NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name varchar(50)  NOT NULL,
    email varchar(150)  NOT NULL,
    phone varchar(9)  NOT NULL,
    birthdate date  NOT NULL,
    status bit  NOT NULL,
    created_at datetime  NOT NULL,
    CONSTRAINT customer_pk PRIMARY KEY  (id_customer)
);

-- Table: inventory
CREATE TABLE inventory (
    id_inventory int  NOT NULL,
    current_stock decimal(10,2)  NOT NULL,
    minimum_stock decimal(10,2)  NOT NULL,
    last_update datetime  NOT NULL,
    id_product int  NOT NULL,
    id_warehouse int  NOT NULL,
    CONSTRAINT inventory_pk PRIMARY KEY  (id_inventory)
);

-- Table: payment
CREATE TABLE payment (
    id_payment int  NOT NULL,
    amount_paid decimal(10,2)  NOT NULL,
    payment_date datetime  NOT NULL,
    transaction_reference varchar(100)  NOT NULL,
    id_payment_method int  NOT NULL,
    id_sale int  NOT NULL,
    CONSTRAINT payment_pk PRIMARY KEY  (id_payment)
);

-- Table: payment_method
CREATE TABLE payment_method (
    id_payment_method int  NOT NULL,
    name varchar(50)  NOT NULL,
    is_electronic bit  NOT NULL,
    status bit  NOT NULL,
    CONSTRAINT payment_method_pk PRIMARY KEY  (id_payment_method)
);

-- Table: product
CREATE TABLE product (
    id_product int  NOT NULL,
    name varchar(100)  NOT NULL,
    description varchar(255)  NULL,
    barcode_sku varchar(30)  NOT NULL,
    measurement_unit varchar(20)  NOT NULL,
    unit_price decimal(10,2)  NOT NULL,
    status bit  NOT NULL,
    created_at datetime  NOT NULL,
    id_category int  NOT NULL,
    CONSTRAINT product_pk PRIMARY KEY  (id_product)
);

-- Table: sale
CREATE TABLE sale (
    id_sale int  NOT NULL,
    sale_date datetime  NOT NULL,
    document_type varchar(20)  NOT NULL,
    document_number varchar(20)  NOT NULL,
    total_amount decimal(10,2)  NOT NULL,
    status char(1)  NOT NULL,
    id_customer int  NOT NULL,
    id_warehouse int  NOT NULL,
    CONSTRAINT sale_pk PRIMARY KEY  (id_sale)
);

-- Table: sale_detail
CREATE TABLE sale_detail (
    id_sale_detail int  NOT NULL,
    quantity decimal(10,2)  NOT NULL,
    unit_price decimal(10,2)  NOT NULL,
    subtotal decimal(10,2)  NOT NULL,
    discount decimal(10,2)  NULL,
    id_sale int  NOT NULL,
    id_product int  NOT NULL,
    CONSTRAINT sale_detail_pk PRIMARY KEY  (id_sale_detail)
);

-- Table: warehouse
CREATE TABLE warehouse (
    id_warehouse int  NOT NULL,
    name varchar(50)  NOT NULL,
    address varchar(150)  NOT NULL,
    status bit  NOT NULL,
    created_at datetime  NOT NULL,
    CONSTRAINT warehouse_pk PRIMARY KEY  (id_warehouse)
);

-- foreign keys
-- Reference: INVENTORY_PRODUCT (table: inventory)
ALTER TABLE inventory ADD CONSTRAINT INVENTORY_PRODUCT
    FOREIGN KEY (id_product)
    REFERENCES product (id_product);

-- Reference: INVENTORY_WAREHOUSE (table: inventory)
ALTER TABLE inventory ADD CONSTRAINT INVENTORY_WAREHOUSE
    FOREIGN KEY (id_warehouse)
    REFERENCES warehouse (id_warehouse);

-- Reference: PAYMENT_PAYMENT_METHOD (table: payment)
ALTER TABLE payment ADD CONSTRAINT PAYMENT_PAYMENT_METHOD
    FOREIGN KEY (id_payment_method)
    REFERENCES payment_method (id_payment_method);

-- Reference: PAYMENT_SALE (table: payment)
ALTER TABLE payment ADD CONSTRAINT PAYMENT_SALE
    FOREIGN KEY (id_sale)
    REFERENCES sale (id_sale);

-- Reference: PRODUCT_CATEGORY (table: product)
ALTER TABLE product ADD CONSTRAINT PRODUCT_CATEGORY
    FOREIGN KEY (id_category)
    REFERENCES category (id_category);

-- Reference: SALE_CUSTOMER (table: sale)
ALTER TABLE sale ADD CONSTRAINT SALE_CUSTOMER
    FOREIGN KEY (id_customer)
    REFERENCES customer (id_customer);

-- Reference: SALE_DETAIL_PRODUCT (table: sale_detail)
ALTER TABLE sale_detail ADD CONSTRAINT SALE_DETAIL_PRODUCT
    FOREIGN KEY (id_product)
    REFERENCES product (id_product);

-- Reference: SALE_DETAIL_SALE (table: sale_detail)
ALTER TABLE sale_detail ADD CONSTRAINT SALE_DETAIL_SALE
    FOREIGN KEY (id_sale)
    REFERENCES sale (id_sale);

-- Reference: SALE_WAREHOUSE (table: sale)
ALTER TABLE sale ADD CONSTRAINT SALE_WAREHOUSE
    FOREIGN KEY (id_warehouse)
    REFERENCES warehouse (id_warehouse);

-- End of file.

-- 1. CATEGORY
INSERT INTO category (id_category, name, description, status, created_at, category_code) VALUES
(1, 'Vinos Tintos', 'Vinos de uva tinta de alta calidad', 1, GETDATE(), 'VIN'),
(2, 'Piscos Puros', 'Destilados de uva quebranta y mollar', 1, GETDATE(), 'PIS'),
(3, 'Cremas de Pisco', 'Licores dulces a base de pisco y fruta', 1, GETDATE(), 'CRE'),
(4, 'Vinos Blancos', 'Vinos jóvenes y refrescantes', 1, GETDATE(), 'VIB'),
(5, 'Promociones', 'Packs y descuentos especiales', 1, GETDATE(), 'PRO');

-- 2. PRODUCT
INSERT INTO product (id_product, name, description, barcode_sku, measurement_unit, unit_price, status, created_at, id_category) VALUES
(1, 'Vino Malbec Reservado', 'Vino tinto roble 750ml', '7750123456789', '750ml', 45.00, 1, GETDATE(), 1),
(2, 'Pisco Quebranta Premium', 'Pisco puro artesanal', '7750987654321', '1 Litro', 65.00, 1, GETDATE(), 2),
(3, 'Crema de Pisco de Lúcuma', 'Licor dulce cremoso', 'SKU-CRE-LUC', '500ml', 35.00, 1, GETDATE(), 3),
(4, 'Vino Sauvignon Blanc', 'Vino blanco joven', '7750223344556', '750ml', 38.00, 1, GETDATE(), 4),
(5, 'Pisco Acholado Especial', 'Mezcla de cepas seleccionadas', 'SKU-PIS-ACH', '1 Litro', 70.00, 1, GETDATE(), 2);

-- 3. WAREHOUSE (Tus 3 Bodegas confirmadas)
INSERT INTO warehouse (id_warehouse, name, address, status, created_at) VALUES
(1, 'Bodega Principal - Asia', 'Av. Principal 123, Asia', 1, GETDATE()),
(2, 'Almacén Chocaya', 'Fundo Chocaya S/N, Asia', 1, GETDATE()),
(3, 'Tienda Exhibición - Boulevard', 'Boulevard de Asia, Local 45', 1, GETDATE()),
(4, 'Depósito Logístico Sur', 'Panamericana Sur Km 97', 1, GETDATE()),
(5, 'Bodega de Reposo', 'Calle Los Viñedos 456', 1, GETDATE());

-- 4. INVENTORY (Cruce de Stock por Bodega)
INSERT INTO inventory (id_inventory, current_stock, minimum_stock, last_update, id_product, id_warehouse) VALUES
(1, 50.00, 10.00, GETDATE(), 1, 1),
(2, 20.00, 5.00, GETDATE(), 1, 2),
(3, 100.00, 20.00, GETDATE(), 2, 1),
(4, 30.00, 10.00, GETDATE(), 3, 3),
(5, 15.00, 5.00, GETDATE(), 5, 2);

-- 5. CUSTOMER
INSERT INTO customer (id_customer, document_type, document_number, first_name, last_name, email, phone, birthdate, status, created_at) VALUES
(1, 'DNI', '72145678', 'Sebastian', 'Alvarez', 'sebastian@mail.com', '987654321', '2004-05-15', 1, GETDATE()),
(2, 'DNI', '45678912', 'Angel', 'Perez', 'angel.p@mail.com', '999888777', '2003-08-20', 1, GETDATE()),
(3, 'CE ', '00123456', 'Valeriano', 'Gomez', 'valeriano@mail.com', '912345678', '2002-12-10', 1, GETDATE()),
(4, 'DNI', '12345678', 'Maria', 'Sosa', 'maria.sosa@mail.com', '955444333', '1995-03-25', 1, GETDATE()),
(5, 'RUC', '20123456789', 'Distribuidora Asia SAC', 'Ventas Corp', 'ventas@asiacorp.pe', '944333222', '1990-01-01', 1, GETDATE());

-- 6. PAYMENT_METHOD
INSERT INTO payment_method (id_payment_method, name, is_electronic, status) VALUES
(1, 'Efectivo', 0, 1),
(2, 'Yape', 1, 1),
(3, 'Plin', 1, 1),
(4, 'Tarjeta Visa', 1, 1),
(5, 'Transferencia BCP', 1, 1);

-- 7. SALE
INSERT INTO sale (id_sale, sale_date, document_type, document_number, total_amount, status, id_customer, id_warehouse) VALUES
(1, GETDATE(), 'Boleta', 'B001-0001', 45.00, 'C', 1, 1),
(2, GETDATE(), 'Factura', 'F001-0001', 130.00, 'C', 5, 3),
(3, GETDATE(), 'Boleta', 'B001-0002', 70.00, 'C', 2, 1),
(4, GETDATE(), 'Boleta', 'B001-0003', 35.00, 'P', 3, 3),
(5, GETDATE(), 'Ticket', 'T001-0001', 105.00, 'C', 4, 1);

-- 8. SALE_DETAIL (Snapshot de precios)
INSERT INTO sale_detail (id_sale_detail, quantity, unit_price, subtotal, discount, id_sale, id_product) VALUES
(1, 1.00, 45.00, 45.00, 0.00, 1, 1),
(2, 2.00, 65.00, 130.00, 0.00, 2, 2),
(3, 1.00, 70.00, 70.00, 0.00, 3, 5),
(4, 1.00, 35.00, 35.00, 0.00, 4, 3),
(5, 3.00, 35.00, 105.00, 0.00, 5, 3);

-- 9. PAYMENT
INSERT INTO payment (id_payment, amount_paid, payment_date, transaction_reference, id_payment_method, id_sale) VALUES
(1, 45.00, GETDATE(), 'CASH-001', 1, 1),
(2, 130.00, GETDATE(), 'OP-987654', 5, 2),
(3, 70.00, GETDATE(), 'YAPE-5544', 2, 3),
(4, 35.00, GETDATE(), 'PLIN-1122', 3, 4),
(5, 105.00, GETDATE(), 'VISA-4433', 4, 5);

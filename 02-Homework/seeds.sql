USE employees_db;

INSERT INTO departments ( `name` )
VALUES ( 'Sales' )
	,( 'Human Resources' )
    ,( 'Marketing' );
    
    
INSERT INTO roles ( title, salary, department_id )
VALUES ( 'Sales person', 3500, 1)
	,( 'Human Resources Manager', 3800, 2)
    ,('Marketing Coordinator', 3200, 3);
    
INSERT INTO employees ( first_name, last_name, role_id, manager_id )
VALUES ('Mike', 'Chan', 1, null )
	, ( 'John', 'Doe', 2, null )
	,( 'Ashley', 'Rodriguez', 3, null);
  



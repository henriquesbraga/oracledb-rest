create table names (
    id integer not null,
    name varchar(30) not null
);

CREATE SEQUENCE names.seq
    MINVALUE 1
    NOMAXVALUE
    start with 1
    INCREMENT by 1
    NOCYCLE
    NOCACHE
    NOORDER;
    
    
create table course
(
    course_id varchar(255) charset latin1 not null
        primary key,
    name varchar(255) charset latin1 not null
)
    charset=utf8;

create table eval_ques_junc
(
    question_id bigint not null,
    eval_id int not null,
    primary key (question_id, eval_id)
)
    charset=utf8;

create table eval_user_junc
(
    user_id int not null,
    eval_id int not null,
    primary key (user_id, eval_id)
)
    charset=utf8;

create index course_id_idx
    on eval_user_junc (eval_id);

create table evaluation
(
    eval_id int auto_increment
        primary key,
    course_id varchar(255) not null,
    date_start date null,
    date_stop date null,
    time_of_exam int null,
    constraint evaluation_course_course_id_fk
        foreign key (course_id) references course (course_id)
);

create table questions
(
    question_id bigint not null auto_increment
        primary key,
    question_text varchar(255) charset latin1 not null,
    complexity float not null,
    time_use float not null,
    difficulty float not null,
    importance float not null
)
    charset=utf8;

create index question_id_fk_idx
    on questions (question_id);

create index question_id_idx
    on questions (question_id);

create table responses
(
    question_id bigint not null,
    complexity float not null,
    time_use float not null,
    difficulty float not null,
    importance float not null,
    answer_id bigint auto_increment
        primary key,
    constraint question_id_fk
        foreign key (question_id) references questions (question_id)
)
    charset=utf8;

create index question_id_fk_idx
    on responses (question_id);

create table role
(
    role_id int not null
        primary key,
    role_name varchar(255) null
);

create table user
(
    user_id int auto_increment
        primary key,
    email varchar(255) not null,
    password varchar(255) null,
    is_active tinyint null
);

create table user_role
(
    user_id int not null
        primary key,
    role_id int not null
);

create table verification_token
(
    token_id int not null,
    token varchar(255) not null,
    user_id int not null,
    expiry_date datetime not null,
    new_column int null
);


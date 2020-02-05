
DELETE FROM users;
DELETE FROM reservations;

INSERT INTO users
    (name, email, password)
VALUES 
    ('brandon fake', 'fake1@hotmail.com'
, '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.') , 
    ('ayo fake', 'fake2@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('rusul fake', 'fake3@hotmai.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('property owner', 'iownproperty@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO reservations
    (id, start_date, end_date)
VALUES
    (1, '2018-09-11', '2018-09-26'),
    (2, '2019-01-04', '2019-02-01'),
    (3, '2021-10-01', '2021-10-14');


INSERT INTO properties
    ( title, description, thumbnail_photo_url, cover_photo_url,cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city , province ,post_code)
VALUES
    ('title', 'description', 'thumb', 'cover', 20, 1, 1, 1, 'canada', 75, 'fakestreet', 'toronto', 'on'),
    ('title', 'description', 'thumb', 'cover', 20, 1, 1, 1, 'canada', 85, 'fakestreet', 'toronto', 'on'),
    ('title', 'description', 'thumb', 'cover', 20, 1, 1, 1, 'canada', 95, 'fakestreet', 'toronto', 'on');

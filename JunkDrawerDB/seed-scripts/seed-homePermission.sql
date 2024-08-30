insert into homePermission (homePermissionName, createdBy, createdDate, modifiedBy, modifiedDate)
values ('Owner', 1, getdate(), 1, getdate()),
       ('CanEditBasic', 1, getdate(), 1, getdate()),
       ('CanViewBasic', 1, getdate(), 1, getdate()),
       ('CanEditAccess', 1, getdate(), 1, getdate()),
       ('CanViewAccess', 1, getdate(), 1, getdate()),
       ('CanEditItems', 1, getdate(), 1, getdate()),
       ('CanViewItems', 1, getdate(), 1, getdate()),
       ('CanEditFiles', 1, getdate(), 1, getdate()),
       ('CanViewFiles', 1, getdate(), 1, getdate())

insert into homeRole (homeRoleName, createdBy, createdDate, modifiedBy, modifiedDate)
values ('HomeOwner', 1, getdate(), 1, getdate()),
       ('Viewer', 1, getdate(), 1, getdate())

insert into homeRolePermission (homeRoleId, homePermissionId, createdBy, createdDate, modifiedBy, modifiedDate)
values (1, 1, 1, getdate(), 1, getdate()), --homeOwner
       (2, 3, 1, getdate(), 1, getdate()), --viewer
       (2, 5, 1, getdate(), 1, getdate()),
       (2, 7, 1, getdate(), 1, getdate()),
       (2, 9, 1, getdate(), 1, getdate())
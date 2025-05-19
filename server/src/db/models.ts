import { Model, Table, Column, DataType, HasMany, ForeignKey,
    Unique, AllowNull, Length, NotContains, Is, Validate, Default } from 'sequelize-typescript';

const HASH_REGEX = /^\$2[ayb]\$.{56}$/;

@Table
export class User extends Model {
    @Unique
    @AllowNull(false)
    @Length({ msg: 'Username length should be between 4 and 16.', min: 4, max: 16 })
    @NotContains({msg: 'Username should not contain whitespaces.', args: ' '})
    @Is('Unique', async (value: string) => {
        if (await User.findOne({ where: { name: value }}))
            throw new Error('Sorry, this username is already taken.');
    })
    @Validate({
        notNull: { msg: 'Username cannot be empty' },
    })
    @Column
    declare name: string;

    @Unique
    @AllowNull(false)
    @Is('Unique', async (value: string) => {
        if (await User.findOne({ where: { email: value }}))
            throw new Error('There already is an account with such email.');
    })
    @Validate({
        notNull: { msg: 'User email cannot be empty.' },
        isEmail: { msg: 'Invalid user email.' }
    })
    @Column
    declare email: string;

    @AllowNull(false)
    @Is('Hash', (value: string) => {
        if (!HASH_REGEX.test(value))
            throw new Error(`"${value}" is invalid password hash.`);
    })
    @Validate({
        notNull: { msg: 'User password cannot be empty.' },
    })
    @Column(DataType.STRING(60))
    declare password: string;

    @Column(DataType.STRING(137))
    declare refreshToken: string;

    @HasMany(() => Note)
    declare notes: Note[];
}

@Table
export class Note extends Model {
    @Default('')
    @Column(DataType.TEXT)
    declare title: string;
    
    @Default('')
    @Column(DataType.TEXT)
    declare text: string;

    @Default('#ffffff')
    @Column(DataType.STRING(7))
    declare color: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    declare isPinned: boolean;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Validate({
        notNull: { msg: 'userId cannot be empty.' },
    })
    @Is('Valid', async (value: number) => {
        if (!(await User.findByPk(value)))
            throw new Error('userId must be valid.');
    })
    @Column
    declare userId: number;
}
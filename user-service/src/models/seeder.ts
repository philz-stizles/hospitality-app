import User from '@src/models/user.model'

export const seedUsers = async () => {
  try {
    const users = [
      {
        fullname: 'Admin User',
        email: 'admin@carbon.io',
        password: 'p@ssw0rd',
        roles: ['admin'],
      },
    ]

    const count = await User.countDocuments()
    if (count <= 0) {
      for (const user of users) {
        const newUser = new User(user)
        await newUser.save()
      }

      console.log('Users seeded successfully!!')
    } else {
      console.log('Users in database!!')
    }
  } catch (error) {
    console.log('Users seeding failed', error.message)
  }
}

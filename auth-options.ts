import { PrismaClient } from "@prisma/client"
import { NextAuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { JWT } from "next-auth/jwt";


const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "รหัสพนักงาน", type: "text", placeholder: "เช่น: 501855" },
        password: { label: "รหัสผ่าน", type: "password", placeholder: "รหัสผ่านเริ่มต้น 87654321" }
      },
      async authorize(credentials, req) {
        if(!credentials){
          return null
        }
        const resultFindUser = await prisma.user.findUnique({
          where: {
            user: credentials.username,
          },
          select: {
            id: true,
            user: true,
            hashedPassword: true,
            name: true,
            tel: true,
            section: true,
            role: true,
            suspend: true
          },
        });

        if (!resultFindUser || !resultFindUser.hashedPassword || !resultFindUser.name || resultFindUser.suspend || !(await bcrypt.compare(credentials.password, resultFindUser.hashedPassword))) {
        
          return null
        } 
        const {id,name,user,tel,role,section} = resultFindUser

         return {id,name,user,tel,role,section}
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    jwt: async ({ token, user }:{token:JWT, user:User}) => {
      if (user) {
        token.pea = user
      }
      return token
    },
    session: async ({ session, token }:{session: Session,token:JWT}) => {
      if(!token.pea){
        return session
      }
      const findUser = await prisma.user.findFirst({
        where: {
          id: token.pea.id
        },
        select : {
          id: true,
          user: true,
          name: true,
          tel: true,
          section: true,
          role: true,
          suspend: true
        }
      })
      if(!findUser || findUser.suspend){
        return session
      }
      const {id,name,user,tel,role,section} = findUser
      session.pea = {id,name,user,tel,role,section}
      return session
    }
  },
};
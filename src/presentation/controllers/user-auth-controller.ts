import { UserAuthUseCase } from "@usecases/users/auth/user-auth-usecase";
import { Request, Response } from "express";
import * as yup from 'yup';

class UserAuthController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { username, mail, password } = req.body

      const yupSchema = yup.object({
        username: yup.string().optional(),
        mail: yup.string().optional(),
        password: yup.string().required('Senha é obrigatória')
      })

      const data = await yupSchema.validate({ username, mail, password })

      if (!data.username && !data.mail) throw new Error('Informe o username ou e-mail')

      const userAuthUseCase = new UserAuthUseCase();
      const token = await userAuthUseCase.execute({ mail: data?.mail, password: data.password })

      return res.status(200).json({ token })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(404).json({ error: err.message });
      }
      return res.status(404).json({ error: err });
    }
  }
}

export { UserAuthController };


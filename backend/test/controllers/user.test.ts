import request from 'supertest';
import app from '../../src/app';


describe('POST /api/auth/captcha', () => {
    test('reponse avec code 200 et le captcha contenu dans un JSON', async () => {
        const res = await request(app)
            .post('/api/auth/captcha')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
    });
});


describe('POST /api/auth/signup', () => {
    test('reponse avec code 401 car il manque des informations', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .set('Accept', 'application/json')
            .send({
                email: "test@scanylab.com"
            });

        expect(res.statusCode).toBe(401);
        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe('Il manque des informations.');
    });

    test('reponse avec code 401 car l\'adresse email n\'est pas valide', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .set('Accept', 'application/json')
            .send({
                email: "test-scanylab.com",
                password : "MonSuperMotDePasse",
                name: "nameTest",
                surname: "surnameTest"
            });

        expect(res.statusCode).toBe(401);
        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe('Veuillez entrer une adresse mail valide.');
    });

    test('reponse avec code 401 car le mot de passe n\'est pas assez robuste', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .set('Accept', 'application/json')
            .send({
                email: "test@scanylab.com",
                password : "MonSuperMotDePasse",
                name: "nameTest",
                surname: "surnameTest"
            });

        expect(res.statusCode).toBe(401);
        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe('Le mot de passe n\'est pas assez complexe.');
    });
});